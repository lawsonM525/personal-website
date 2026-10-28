begin;

-- Store only validated portrait choices, never user-supplied SVG or external URLs.
create function public.member_avatar_valid(value jsonb) returns boolean language plpgsql immutable set search_path='' as $$
declare key text; item text; allowed text[];
begin
 if jsonb_typeof(value) is distinct from 'object' then return false; end if;
 if value->'version'<>'1'::jsonb or (select count(*) from jsonb_object_keys(value))<>13 then return false; end if;
 for key,item in select * from jsonb_each_text(value) loop
  allowed:=case key
   when 'version' then array['1']
   when 'hair' then array['none'] || array(select 'short'||lpad(n::text,2,'0') from generate_series(1,24)n) || array(select 'long'||lpad(n::text,2,'0') from generate_series(1,21)n)
   when 'eyes' then array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,12)n)
   when 'mouth' then array(select 'happy'||lpad(n::text,2,'0') from generate_series(1,13)n) || array(select 'sad'||lpad(n::text,2,'0') from generate_series(1,10)n)
   when 'clothing' then array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,23)n)
   when 'glasses' then array['none'] || array(select 'light'||lpad(n::text,2,'0') from generate_series(1,7)n) || array(select 'dark'||lpad(n::text,2,'0') from generate_series(1,7)n)
   when 'hat' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,10)n)
   when 'beard' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,8)n)
   when 'accessories' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,4)n)
   when 'skinColor' then array['ffdbac','f5cfa0','eac393','e0b687','cb9e6e','b68655','a26d3d','8d5524','754425','5c3523','43291f']
   when 'hairColor' then array['18120f','3b2418','603a14','83623b','a78961','cab188','f0d38b','ebebeb','611c17','bd1700','db589b','8054a6','009bbd','43794d']
   when 'clothingColor' then array['03396c','0a47d5','428bca','88d8b0','43794d','ff6f69','d11141','ffd969','f2a8cc','8054a6','faf5e9','28282c']
   when 'backgroundColor' then array['c5e5ef','f6bad8','d9c8f0','cce8b5','f8de8b','f5f0df','0a47d5','008080']
   else null end;
  if allowed is null or item is null or not(item=any(allowed)) then return false; end if;
  if key<>'version' and jsonb_typeof(value->key)<>'string' then return false; end if;
 end loop;
 return true;
end $$;
alter table public.feedback_members add column avatar jsonb check(avatar is null or public.member_avatar_valid(avatar));

create function public.member_profile_save(p_name text,p_avatar jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if char_length(trim(p_name)) not between 2 and 60 or p_name is null then raise exception 'feedback_name'; end if;
 if p_avatar is null or public.member_avatar_valid(p_avatar) is not true then raise exception 'member_invalid_avatar'; end if;
 update public.feedback_members set display_name=trim(p_name),avatar=p_avatar where user_id=actor;
 return public.feedback_member();
end $$;

create or replace function public.feedback_member(p_name text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result jsonb;
begin
 if p_name is not null then
  if char_length(trim(p_name)) not between 2 and 60 then raise exception 'feedback_name'; end if;
  update public.feedback_members set display_name=trim(p_name) where user_id=actor;
 end if;
 select jsonb_build_object('id',actor,'display_name',m.display_name,'avatar',m.avatar,'credits',public.feedback_balance(actor),
  'is_admin',exists(select 1 from public.feedback_admins where user_id=actor),
  'own_projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at desc) from public.feedback_projects p where p.owner_id=actor),'[]'::jsonb),
  'assignment',(select jsonb_build_object('project_id',a.project_id,'expires_at',a.expires_at) from public.feedback_assignments a join public.feedback_projects p on p.id=a.project_id where a.user_id=actor and a.expires_at>now() and p.status='approved')) into result
 from public.feedback_members m where m.user_id=actor;
 return result;
end $$;
create or replace function public.feedback_board() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object(
 'projects',coalesce((select jsonb_agg(to_jsonb(p)-'moderation_note'||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at) from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id where p.status='approved'),'[]'::jsonb),
 'reviews',coalesce((select jsonb_agg(to_jsonb(r)-'status'||jsonb_build_object('reviewer_name',m.display_name,'avatar',m.avatar) order by r.created_at desc) from public.feedback_reviews r join public.feedback_members m on m.user_id=r.reviewer_id join public.feedback_projects p on p.id=r.project_id where r.status='published' and p.status='approved'),'[]'::jsonb),
 'comments',coalesce((select jsonb_agg(to_jsonb(c)-'status'||jsonb_build_object('author_name',m.display_name,'avatar',m.avatar) order by c.created_at) from public.feedback_comments c join public.feedback_members m on m.user_id=c.author_id join public.feedback_projects p on p.id=c.project_id where c.status='published' and p.status='approved'),'[]'::jsonb));
$$;

-- Article comments use the same verified member and portrait as the exchange.
create table public.learn_comments (
 id uuid primary key default gen_random_uuid(), author_id uuid not null references public.feedback_members(user_id),
 article_id text not null check(char_length(article_id) between 1 and 200),
 article_title text not null check(char_length(article_title) between 1 and 200),
 article_slug text not null check(article_slug ~ '^[a-z0-9-]{1,180}$'),
 body text not null check(char_length(body) between 2 and 2000),
 status text not null default 'published' check(status in ('published','hidden')), created_at timestamptz not null default now()
);
create index learn_comments_article on public.learn_comments(article_id,status,created_at);
create index learn_comments_author on public.learn_comments(author_id,created_at);
create table public.learn_comment_reports (
 id uuid primary key default gen_random_uuid(), comment_id uuid not null references public.learn_comments(id),
 reporter_id uuid not null references public.feedback_members(user_id), reason text not null check(reason in ('Spam','Harassment','Other')),
 detail text not null check(char_length(detail) between 10 and 1000), resolved boolean not null default false,
 created_at timestamptz not null default now(), unique(comment_id,reporter_id)
);
alter table public.learn_comments enable row level security;
alter table public.learn_comment_reports enable row level security;
revoke all on public.learn_comments,public.learn_comment_reports from anon,authenticated;

create function public.learn_discussion(p_article_id text) returns jsonb language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg(jsonb_build_object('id',c.id,'body',c.body,'author_name',m.display_name,'avatar',m.avatar,'article_title',c.article_title,'article_slug',c.article_slug,'created_at',c.created_at) order by c.created_at),'[]'::jsonb)
 from public.learn_comments c join public.feedback_members m on m.user_id=c.author_id where c.article_id=p_article_id and c.status='published';
$$;
create function public.learn_comment(p_article_id text,p_article_title text,p_article_slug text,p_body text) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid;
begin
 if (select count(*) from public.learn_comments where author_id=actor and created_at>now()-interval '10 minutes')>=3 then raise exception 'learn_comment_limit'; end if;
 insert into public.learn_comments(author_id,article_id,article_title,article_slug,body) values(actor,p_article_id,p_article_title,p_article_slug,trim(p_body)) returning id into result;
 return result;
end $$;
create function public.learn_report(p_id uuid,p_reason text,p_detail text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.learn_comments where id=p_id and status='published') then raise exception 'feedback_missing_project'; end if;
 if (select count(*) from public.learn_comment_reports where reporter_id=actor and created_at>now()-interval '1 hour')>=10 then raise exception 'feedback_report_limit'; end if;
 insert into public.learn_comment_reports(comment_id,reporter_id,reason,detail) values(p_id,actor,p_reason,trim(p_detail)) on conflict(comment_id,reporter_id) do nothing;
end $$;
create function public.learn_moderation() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 return jsonb_build_object(
 'comments',coalesce((select jsonb_agg(to_jsonb(c)||jsonb_build_object('author_name',m.display_name,'avatar',m.avatar) order by c.created_at desc) from public.learn_comments c join public.feedback_members m on m.user_id=c.author_id),'[]'::jsonb),
 'reports',coalesce((select jsonb_agg(to_jsonb(r)||jsonb_build_object('body',c.body,'author_name',m.display_name,'article_title',c.article_title,'article_slug',c.article_slug) order by r.created_at) from public.learn_comment_reports r join public.learn_comments c on c.id=r.comment_id join public.feedback_members m on m.user_id=c.author_id where not r.resolved),'[]'::jsonb));
end $$;
create function public.learn_moderate(p_id uuid,p_decision text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 if p_decision in ('hide','restore') then
  update public.learn_comments set status=case when p_decision='hide' then 'hidden' else 'published' end where id=p_id;
  if p_decision='hide' then update public.learn_comment_reports set resolved=true where comment_id=p_id; end if;
 elsif p_decision='resolve' then update public.learn_comment_reports set resolved=true where id=p_id;
 else raise exception 'feedback_invalid_action'; end if;
end $$;

revoke all on function public.member_avatar_valid(jsonb),public.member_profile_save(text,jsonb),public.learn_discussion(text),public.learn_comment(text,text,text,text),public.learn_report(uuid,text,text),public.learn_moderation(),public.learn_moderate(uuid,text) from public,anon,authenticated;
grant execute on function public.learn_discussion(text) to anon,authenticated;
grant execute on function public.member_profile_save(text,jsonb),public.learn_comment(text,text,text,text),public.learn_report(uuid,text,text),public.learn_moderation(),public.learn_moderate(uuid,text) to authenticated;
commit;
