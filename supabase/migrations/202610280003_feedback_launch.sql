begin;
-- Keep the historical cost on each request. Free launch requests never acquire
-- a credit debt when the exchange crosses its ten-project launch threshold.
alter table public.feedback_projects add column review_cost smallint not null default 2 check(review_cost in (0,2,3));
alter table public.feedback_members drop constraint feedback_members_starter_credits_check;
alter table public.feedback_members add constraint feedback_members_starter_credits_check check(starter_credits in (0,2,3));
create function public.feedback_submission_cost() returns integer language sql stable security definer set search_path='' as $$
 select case when (select count(*) from public.feedback_projects)>=10 then 3 else 0 end;
$$;
create or replace function public.feedback_balance(member_id uuid) returns integer language sql stable security definer set search_path='' as $$
 select coalesce((select starter_credits from public.feedback_members where user_id=member_id),0)::integer
 + (select count(*)::integer from public.feedback_reviews where reviewer_id=member_id and status='published')
 - coalesce((select sum(review_cost)::integer from public.feedback_projects where owner_id=member_id and status in ('pending','approved')),0);
$$;
create or replace function public.feedback_submit(p_title text,p_url text,p_category text,p_audience text,p_task text,p_focus text)
returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid; cost integer;
begin
 -- Serialize the threshold check and insert: only the first ten requests are free.
 perform pg_advisory_xact_lock(526102);
 cost:=public.feedback_submission_cost();
 if public.feedback_balance(actor)<cost then raise exception 'feedback_need_reviews'; end if;
 if exists(select 1 from public.feedback_projects where owner_id=actor and created_at>now()-interval '24 hours') then raise exception 'feedback_submit_limit'; end if;
 if p_url !~ '^https://[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,63}([/?#][^[:space:]]*)?$' or split_part(split_part(lower(p_url),'/',3),':',1) ~ '(^|\.)(localhost|local|internal|test|invalid|example|onion|localdomain)$' then raise exception 'feedback_public_url'; end if;
 insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status,review_cost)
 values(actor,trim(p_title),p_url,p_category,trim(p_audience),trim(p_task),trim(p_focus),'approved',cost) returning id into result;
 return result;
exception when unique_violation then raise exception 'feedback_duplicate_url';
end $$;
create or replace function public.feedback_seed(p_email text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); target uuid;
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 select id into target from auth.users where lower(email)=lower(trim(p_email)) and email_confirmed_at is not null;
 if target is null then raise exception 'feedback_member_not_found'; end if;
 insert into public.feedback_members(user_id,starter_credits) values(target,3) on conflict(user_id) do update set starter_credits=3 where public.feedback_members.starter_credits=0;
end $$;
create or replace function public.feedback_member(p_name text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result jsonb;
begin
 if p_name is not null then
  if char_length(trim(p_name)) not between 2 and 60 then raise exception 'feedback_name'; end if;
  update public.feedback_members set display_name=trim(p_name) where user_id=actor;
 end if;
 select jsonb_build_object('id',actor,'display_name',m.display_name,'avatar',m.avatar,'credits',public.feedback_balance(actor),'submission_cost',public.feedback_submission_cost(),
  'is_admin',exists(select 1 from public.feedback_admins where user_id=actor),
  'own_projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at desc) from public.feedback_projects p where p.owner_id=actor),'[]'::jsonb),
  'assignment',(select jsonb_build_object('project_id',a.project_id,'expires_at',a.expires_at) from public.feedback_assignments a join public.feedback_projects p on p.id=a.project_id where a.user_id=actor and a.expires_at>now() and p.status='approved')) into result
 from public.feedback_members m where m.user_id=actor;
 return result;
end $$;
create or replace function public.feedback_board() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object('submission_cost',public.feedback_submission_cost(),'launch_remaining',greatest(0,10-(select count(*) from public.feedback_projects)),
 'projects',coalesce((select jsonb_agg(to_jsonb(p)-'moderation_note'||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at) from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id where p.status='approved'),'[]'::jsonb),
 'reviews',coalesce((select jsonb_agg(to_jsonb(r)-'status'||jsonb_build_object('reviewer_name',m.display_name,'avatar',m.avatar) order by r.created_at desc) from public.feedback_reviews r join public.feedback_members m on m.user_id=r.reviewer_id join public.feedback_projects p on p.id=r.project_id where r.status='published' and p.status='approved'),'[]'::jsonb),
 'comments',coalesce((select jsonb_agg(to_jsonb(c)-'status'||jsonb_build_object('author_name',m.display_name,'avatar',m.avatar) order by c.created_at) from public.feedback_comments c join public.feedback_members m on m.user_id=c.author_id join public.feedback_projects p on p.id=c.project_id where c.status='published' and p.status='approved'),'[]'::jsonb));
$$;
revoke all on function public.feedback_submission_cost() from public,anon,authenticated;
commit;
