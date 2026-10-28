begin;
create table public.feedback_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'Builder' check(char_length(display_name) between 2 and 60),
 starter_credits smallint not null default 0 check(starter_credits in (0,2)), blocked boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.feedback_admins (user_id uuid primary key references auth.users(id) on delete cascade);
create table public.feedback_projects (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.feedback_members(user_id),
 title text not null check(char_length(title) between 3 and 80), url text not null check(char_length(url)<=2048),
 category text not null check(category in ('Web app','Website','Mobile app','Creative experiment')),
 audience text not null check(char_length(audience) between 12 and 250), task text not null check(char_length(task) between 20 and 500),
 focus text not null check(char_length(focus) between 12 and 500), status text not null default 'pending' check(status in ('pending','approved','rejected')),
 featured boolean not null default false, moderation_note text, created_at timestamptz not null default now()
);
create unique index feedback_unique_active_url on public.feedback_projects(lower(rtrim(url,'/'))) where status in ('pending','approved');
create table public.feedback_reviews (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.feedback_projects(id), reviewer_id uuid not null references public.feedback_members(user_id),
 purpose text not null check(char_length(purpose) between 40 and 1500), confusion text not null check(char_length(confusion) between 40 and 1500),
 improvement text not null check(char_length(improvement) between 40 and 1500), design_score smallint not null check(design_score between 1 and 5),
 outcome text not null check(outcome in ('Completed it','Partly completed it','Got stuck')), status text not null default 'published' check(status in ('published','hidden')),
 created_at timestamptz not null default now(), unique(project_id,reviewer_id)
);
create table public.feedback_comments (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.feedback_projects(id), author_id uuid not null references public.feedback_members(user_id),
 body text not null check(char_length(body) between 20 and 2000), status text not null default 'published' check(status in ('published','hidden')), created_at timestamptz not null default now()
);
create table public.feedback_assignments (user_id uuid primary key references public.feedback_members(user_id), project_id uuid not null references public.feedback_projects(id), expires_at timestamptz not null);
create table public.feedback_reports (
 id uuid primary key default gen_random_uuid(), reporter_id uuid not null references public.feedback_members(user_id),
 target_kind text not null check(target_kind in ('project','review','comment')), target_id uuid not null,
 reason text not null check(reason in ('Unsafe link','Spam','Harassment','Other')), detail text not null check(char_length(detail) between 20 and 1000),
 resolved boolean not null default false, created_at timestamptz not null default now(), unique(reporter_id,target_kind,target_id)
);
create index feedback_project_queue on public.feedback_projects(status,created_at);
create index feedback_reviews_project on public.feedback_reviews(project_id,status);
create index feedback_reviews_member on public.feedback_reviews(reviewer_id,status);
create index feedback_comments_project on public.feedback_comments(project_id,status);
create index feedback_assignment_project on public.feedback_assignments(project_id,expires_at);
create index feedback_reports_open on public.feedback_reports(resolved,created_at);
-- No client has table write access. Mutations go through the narrow RPC functions below.
alter table public.feedback_members enable row level security;
alter table public.feedback_admins enable row level security;
alter table public.feedback_projects enable row level security;
alter table public.feedback_reviews enable row level security;
alter table public.feedback_comments enable row level security;
alter table public.feedback_assignments enable row level security;
alter table public.feedback_reports enable row level security;
revoke all on public.feedback_members,public.feedback_admins,public.feedback_projects,public.feedback_reviews,public.feedback_comments,public.feedback_assignments,public.feedback_reports from anon,authenticated;

create function public.feedback_actor() returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := auth.uid();
begin
 if actor is null or not exists(select 1 from auth.users where id=actor and email_confirmed_at is not null) then raise exception 'feedback_sign_in'; end if;
 insert into public.feedback_members(user_id) values(actor) on conflict do nothing;
 perform 1 from public.feedback_members where user_id=actor for update;
 if exists(select 1 from public.feedback_members where user_id=actor and blocked) then raise exception 'feedback_blocked'; end if;
 return actor;
end $$;
create function public.feedback_balance(member_id uuid) returns integer language sql stable security definer set search_path='' as $$
 select coalesce((select starter_credits from public.feedback_members where user_id=member_id),0)::integer
 + (select count(*)::integer from public.feedback_reviews where reviewer_id=member_id and status='published')
 - 2*(select count(*)::integer from public.feedback_projects where owner_id=member_id and status in ('pending','approved'));
$$;
create function public.feedback_member(p_name text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result jsonb;
begin
 if p_name is not null then
  if char_length(trim(p_name)) not between 2 and 60 then raise exception 'feedback_name'; end if;
  update public.feedback_members set display_name=trim(p_name) where user_id=actor;
 end if;
 select jsonb_build_object('id',actor,'display_name',m.display_name,'credits',public.feedback_balance(actor),
  'is_admin',exists(select 1 from public.feedback_admins where user_id=actor),
  'own_projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at desc) from public.feedback_projects p where p.owner_id=actor),'[]'::jsonb),
  'assignment',(select jsonb_build_object('project_id',a.project_id,'expires_at',a.expires_at) from public.feedback_assignments a join public.feedback_projects p on p.id=a.project_id where a.user_id=actor and a.expires_at>now() and p.status='approved')) into result
 from public.feedback_members m where m.user_id=actor;
 return result;
end $$;
create function public.feedback_board() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object(
 'projects',coalesce((select jsonb_agg(to_jsonb(p)-'moderation_note'||jsonb_build_object('builder_name',m.display_name,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at) from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id where p.status='approved'),'[]'::jsonb),
 'reviews',coalesce((select jsonb_agg(to_jsonb(r)-'status'||jsonb_build_object('reviewer_name',m.display_name) order by r.created_at desc) from public.feedback_reviews r join public.feedback_members m on m.user_id=r.reviewer_id join public.feedback_projects p on p.id=r.project_id where r.status='published' and p.status='approved'),'[]'::jsonb),
 'comments',coalesce((select jsonb_agg(to_jsonb(c)-'status'||jsonb_build_object('author_name',m.display_name) order by c.created_at) from public.feedback_comments c join public.feedback_members m on m.user_id=c.author_id join public.feedback_projects p on p.id=c.project_id where c.status='published' and p.status='approved'),'[]'::jsonb));
$$;
create function public.feedback_assign() returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); chosen uuid;
begin
 -- Serialize assignments so simultaneous requests spread across the queue.
 perform pg_advisory_xact_lock(526101);
 select a.project_id into chosen from public.feedback_assignments a join public.feedback_projects p on p.id=a.project_id where a.user_id=actor and a.expires_at>now() and p.status='approved';
 if chosen is not null then return chosen; end if;
 select p.id into chosen from public.feedback_projects p where p.status='approved' and p.owner_id<>actor
 and not exists(select 1 from public.feedback_reviews r where r.project_id=p.id and r.reviewer_id=actor)
 order by (select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')+(select count(*) from public.feedback_assignments a where a.project_id=p.id and a.expires_at>now()),
 (select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published'),p.created_at limit 1;
 if chosen is null then raise exception 'feedback_empty_queue'; end if;
 insert into public.feedback_assignments(user_id,project_id,expires_at) values(actor,chosen,now()+interval '45 minutes') on conflict(user_id) do update set project_id=excluded.project_id,expires_at=excluded.expires_at;
 return chosen;
end $$;
create function public.feedback_submit(p_title text,p_url text,p_category text,p_audience text,p_task text,p_focus text) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result uuid;
begin
 if public.feedback_balance(actor)<2 then raise exception 'feedback_need_reviews'; end if;
 if exists(select 1 from public.feedback_projects where owner_id=actor and created_at>now()-interval '24 hours') then raise exception 'feedback_submit_limit'; end if;
 if p_url !~ '^https://[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,63}([/?#][^[:space:]]*)?$' or split_part(split_part(lower(p_url),'/',3),':',1) ~ '(^|\.)(localhost|local|internal|test|invalid|example|onion|localdomain)$' then raise exception 'feedback_public_url'; end if;
 insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus) values(actor,trim(p_title),p_url,p_category,trim(p_audience),trim(p_task),trim(p_focus)) returning id into result;
 return result;
exception when unique_violation then raise exception 'feedback_duplicate_url';
end $$;
create function public.feedback_review(p_project_id uuid,p_purpose text,p_confusion text,p_improvement text,p_design_score integer,p_outcome text) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result uuid;
begin
 if not exists(select 1 from public.feedback_projects where id=p_project_id and status='approved' and owner_id<>actor) then raise exception 'feedback_not_reviewable'; end if;
 if not exists(select 1 from public.feedback_assignments where user_id=actor and project_id=p_project_id and expires_at>now()) then raise exception 'feedback_assignment_expired'; end if;
 if lower(regexp_replace(trim(p_purpose),'\s+',' ','g')) in (lower(regexp_replace(trim(p_confusion),'\s+',' ','g')),lower(regexp_replace(trim(p_improvement),'\s+',' ','g'))) or lower(regexp_replace(trim(p_confusion),'\s+',' ','g'))=lower(regexp_replace(trim(p_improvement),'\s+',' ','g')) then raise exception 'feedback_distinct_answers'; end if;
 if (select count(*) from public.feedback_reviews where reviewer_id=actor and created_at>now()-interval '24 hours')>=10 then raise exception 'feedback_review_limit'; end if;
 insert into public.feedback_reviews(project_id,reviewer_id,purpose,confusion,improvement,design_score,outcome) values(p_project_id,actor,trim(p_purpose),trim(p_confusion),trim(p_improvement),p_design_score,p_outcome) returning id into result;
 delete from public.feedback_assignments where user_id=actor;
 return result;
exception when unique_violation then raise exception 'feedback_already_reviewed';
end $$;
create function public.feedback_comment(p_project_id uuid,p_body text) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result uuid;
begin
 if not exists(select 1 from public.feedback_projects where id=p_project_id and status='approved') then raise exception 'feedback_missing_project'; end if;
 if (select count(*) from public.feedback_comments where author_id=actor and created_at>now()-interval '10 minutes')>=5 then raise exception 'feedback_comment_limit'; end if;
 insert into public.feedback_comments(project_id,author_id,body) values(p_project_id,actor,trim(p_body)) returning id into result; return result;
end $$;
create function public.feedback_report(p_kind text,p_id uuid,p_reason text,p_detail text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor();
begin
 if not ((p_kind='project' and exists(select 1 from public.feedback_projects where id=p_id and status='approved')) or (p_kind='review' and exists(select 1 from public.feedback_reviews where id=p_id and status='published')) or (p_kind='comment' and exists(select 1 from public.feedback_comments where id=p_id and status='published'))) then raise exception 'feedback_missing_project'; end if;
 if (select count(*) from public.feedback_reports where reporter_id=actor and created_at>now()-interval '1 hour')>=10 then raise exception 'feedback_report_limit'; end if;
 insert into public.feedback_reports(reporter_id,target_kind,target_id,reason,detail) values(actor,p_kind,p_id,p_reason,trim(p_detail)) on conflict(reporter_id,target_kind,target_id) do nothing;
end $$;
create function public.feedback_moderation() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 return jsonb_build_object('projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'review_count',0) order by p.created_at) from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id where p.status='pending'),'[]'::jsonb),'reports',coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at) from public.feedback_reports r where not r.resolved),'[]'::jsonb));
end $$;
create function public.feedback_moderate(p_kind text,p_id uuid,p_decision text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 if p_kind='project' and p_decision in ('approve','reject') then update public.feedback_projects set status=case when p_decision='approve' then 'approved' else 'rejected' end,featured=case when p_decision='reject' then false else featured end where id=p_id;
 elsif p_kind='project' and p_decision in ('pick','unpick') then update public.feedback_projects set featured=(p_decision='pick') where id=p_id and status='approved';
 elsif p_kind='review' and p_decision in ('hide','restore') then
  -- Lock the reviewer before changing a credit-bearing review.
  perform 1 from public.feedback_members where user_id=(select reviewer_id from public.feedback_reviews where id=p_id) for update;
  update public.feedback_reviews set status=case when p_decision='hide' then 'hidden' else 'published' end where id=p_id;
 elsif p_kind='comment' and p_decision='hide' then update public.feedback_comments set status='hidden' where id=p_id;
 elsif p_kind='report' and p_decision='resolve' then update public.feedback_reports set resolved=true where id=p_id;
 else raise exception 'feedback_invalid_action'; end if;
 if p_kind<>'report' then update public.feedback_reports set resolved=true where target_kind=p_kind and target_id=p_id; end if;
end $$;
create function public.feedback_seed(p_email text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); target uuid;
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 select id into target from auth.users where lower(email)=lower(trim(p_email)) and email_confirmed_at is not null;
 if target is null then raise exception 'feedback_member_not_found'; end if;
 insert into public.feedback_members(user_id,starter_credits) values(target,2) on conflict(user_id) do update set starter_credits=2;
end $$;
revoke all on function public.feedback_actor(),public.feedback_balance(uuid),public.feedback_member(text),public.feedback_board(),public.feedback_assign(),public.feedback_submit(text,text,text,text,text,text),public.feedback_review(uuid,text,text,text,integer,text),public.feedback_comment(uuid,text),public.feedback_report(text,uuid,text,text),public.feedback_moderation(),public.feedback_moderate(text,uuid,text),public.feedback_seed(text) from public,anon,authenticated;
grant execute on function public.feedback_board() to anon,authenticated;
grant execute on function public.feedback_member(text),public.feedback_assign(),public.feedback_submit(text,text,text,text,text,text),public.feedback_review(uuid,text,text,text,integer,text),public.feedback_comment(uuid,text),public.feedback_report(text,uuid,text,text),public.feedback_moderation(),public.feedback_moderate(text,uuid,text),public.feedback_seed(text) to authenticated;
commit;
