begin;

-- Keep stored status names compatible with existing clients: approved = published,
-- rejected = removed. Verified accounts and review-credit rules still apply.
alter table public.feedback_projects alter column status set default 'approved';

create or replace function public.feedback_submit(p_title text,p_url text,p_category text,p_audience text,p_task text,p_focus text)
returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result uuid;
begin
 if public.feedback_balance(actor)<2 then raise exception 'feedback_need_reviews'; end if;
 if exists(select 1 from public.feedback_projects where owner_id=actor and created_at>now()-interval '24 hours') then raise exception 'feedback_submit_limit'; end if;
 if p_url !~ '^https://[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,63}([/?#][^[:space:]]*)?$' or split_part(split_part(lower(p_url),'/',3),':',1) ~ '(^|\.)(localhost|local|internal|test|invalid|example|onion|localdomain)$' then raise exception 'feedback_public_url'; end if;
 insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status)
 values(actor,trim(p_title),p_url,p_category,trim(p_audience),trim(p_task),trim(p_focus),'approved') returning id into result;
 return result;
exception when unique_violation then raise exception 'feedback_duplicate_url';
end $$;

create or replace function public.feedback_moderation() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 return jsonb_build_object(
  'projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'review_count',
   (select count(*) from public.feedback_reviews v where v.project_id=p.id and v.status='published')) order by p.created_at desc)
   from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id),'[]'::jsonb),
  'reports',coalesce((select jsonb_agg(to_jsonb(r)||jsonb_build_object('target',jsonb_build_object(
   'project_id',p.id,'project_title',p.title,'project_url',p.url,'author_name',m.display_name,
   'status',case r.target_kind when 'project' then p.status when 'review' then v.status else c.status end,
   'body',case r.target_kind when 'project' then concat_ws(E'\n',p.audience,p.task,p.focus)
    when 'review' then concat_ws(E'\n\n',v.purpose,v.confusion,v.improvement) else c.body end
   )) order by r.created_at)
   from public.feedback_reports r
   left join public.feedback_reviews v on r.target_kind='review' and v.id=r.target_id
   left join public.feedback_comments c on r.target_kind='comment' and c.id=r.target_id
   left join public.feedback_projects p on p.id=case r.target_kind when 'project' then r.target_id when 'review' then v.project_id else c.project_id end
   left join public.feedback_members m on m.user_id=case r.target_kind when 'project' then p.owner_id when 'review' then v.reviewer_id else c.author_id end
   where not r.resolved),'[]'::jsonb),
  'hidden',coalesce((select jsonb_agg(to_jsonb(h) order by h.created_at desc) from (
   select 'review'::text as kind,v.id,v.project_id,p.title as project_title,m.display_name as author_name,
    concat_ws(E'\n\n',v.purpose,v.confusion,v.improvement) as body,v.created_at
   from public.feedback_reviews v join public.feedback_projects p on p.id=v.project_id join public.feedback_members m on m.user_id=v.reviewer_id where v.status='hidden'
   union all
   select 'comment'::text,c.id,c.project_id,p.title,m.display_name,c.body,c.created_at
   from public.feedback_comments c join public.feedback_projects p on p.id=c.project_id join public.feedback_members m on m.user_id=c.author_id where c.status='hidden'
  )h),'[]'::jsonb)
 );
end $$;

create or replace function public.feedback_moderate(p_kind text,p_id uuid,p_decision text)
returns void language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 if p_kind='project' and p_decision in ('hide','restore','approve','reject') then
  update public.feedback_projects set
   status=case when p_decision in ('hide','reject') then 'rejected' else 'approved' end,
   featured=case when p_decision in ('hide','reject') then false else featured end
  where id=p_id;
 elsif p_kind='project' and p_decision in ('pick','unpick') then
  update public.feedback_projects set featured=(p_decision='pick') where id=p_id and status='approved';
 elsif p_kind='review' and p_decision in ('hide','restore') then
  perform 1 from public.feedback_members where user_id=(select reviewer_id from public.feedback_reviews where id=p_id) for update;
  update public.feedback_reviews set status=case when p_decision='hide' then 'hidden' else 'published' end where id=p_id;
 elsif p_kind='comment' and p_decision in ('hide','restore') then
  update public.feedback_comments set status=case when p_decision='hide' then 'hidden' else 'published' end where id=p_id;
 elsif p_kind='report' and p_decision='resolve' then
  update public.feedback_reports set resolved=true where id=p_id;
 else raise exception 'feedback_invalid_action'; end if;
 -- Featuring a project must not silently dismiss reports about it.
 if p_decision in ('hide','reject') then
  update public.feedback_reports set resolved=true where target_kind=p_kind and target_id=p_id;
 end if;
end $$;

-- Release any old approval queue under the same publish-first policy.
update public.feedback_projects set status='approved' where status='pending';

-- CREATE OR REPLACE preserves the existing narrow function grants. RLS and
-- direct-table restrictions are unchanged; no secret/service-role key is used.
commit;
