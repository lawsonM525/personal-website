begin;
-- Preserve existing comments and the original four-argument posting RPC.
alter table public.learn_comments add column parent_id uuid references public.learn_comments(id);
alter table public.learn_comments add column gif_id text check(gif_id in ('typing-cat','happy-frog','happy-dance','thank-you','applause','sending-love'));
alter table public.learn_comments drop constraint learn_comments_body_check;
alter table public.learn_comments add constraint learn_comments_body_check check(
 char_length(body) between 2 and 2000 or (body='' and gif_id is not null)
);
create index learn_comments_parent on public.learn_comments(parent_id);

create table public.learn_comment_reactions (
 comment_id uuid not null references public.learn_comments(id),
 user_id uuid not null references public.feedback_members(user_id),
 kind text not null check(kind in ('love','laugh','mindblown','sparkles','frog')),
 created_at timestamptz not null default now(), primary key(comment_id,user_id,kind)
);
create index learn_comment_reactions_actor on public.learn_comment_reactions(user_id,created_at);
alter table public.learn_comment_reactions enable row level security;
revoke all on public.learn_comment_reactions from public,anon,authenticated;

-- A hidden parent hides its whole thread, reversibly. No orphaned replies leak.
create function public.learn_comment_visible(p_id uuid) returns boolean language sql stable security definer set search_path='' as $$
 with recursive ancestors as (
  select id,parent_id,status from public.learn_comments where id=p_id
  union
  select c.id,c.parent_id,c.status from public.learn_comments c join ancestors a on c.id=a.parent_id
 ) select coalesce(bool_and(status='published') and bool_or(parent_id is null),false) from ancestors;
$$;
revoke all on function public.learn_comment_visible(uuid) from public,anon,authenticated;

create or replace function public.learn_discussion(p_article_id text) returns jsonb language sql stable security definer set search_path='' as $$
 with recursive visible as (
  select c.* from public.learn_comments c where c.article_id=p_article_id and c.status='published' and c.parent_id is null
  union all
  select c.* from public.learn_comments c join visible p on c.parent_id=p.id
   where c.article_id=p_article_id and c.status='published'
 )
 select coalesce(jsonb_agg(jsonb_build_object(
  'id',c.id,'parent_id',c.parent_id,'gif_id',c.gif_id,'body',c.body,
  'author_name',m.display_name,'avatar',m.avatar,'article_title',c.article_title,
  'article_slug',c.article_slug,'created_at',c.created_at,
  'reactions',(select coalesce(jsonb_agg(r.value order by r.kind),'[]'::jsonb) from (
   select kind,jsonb_build_object('kind',kind,'count',count(*),'reacted',coalesce(bool_or(user_id=auth.uid()),false)) as value
   from public.learn_comment_reactions where comment_id=c.id group by kind
  ) r)
 ) order by c.created_at,c.id),'[]'::jsonb)
 from visible c join public.feedback_members m on m.user_id=c.author_id;
$$;

create function public.learn_post(p_article_id text,p_article_title text,p_article_slug text,p_body text,p_parent_id uuid default null,p_gif_id text default null) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid;
begin
 if p_body is null or not (char_length(trim(p_body)) between 2 and 2000 or (trim(p_body)='' and p_gif_id is not null)) then raise exception 'learn_comment_length'; end if;
 if p_gif_id is not null and p_gif_id not in ('typing-cat','happy-frog','happy-dance','thank-you','applause','sending-love') then raise exception 'learn_invalid_gif'; end if;
 if p_parent_id is not null and not exists(select 1 from public.learn_comments where id=p_parent_id and article_id=p_article_id and public.learn_comment_visible(id)) then raise exception 'learn_missing_comment'; end if;
 if (select count(*) from public.learn_comments where author_id=actor and created_at>now()-interval '10 minutes')>=3 then raise exception 'learn_comment_limit'; end if;
 insert into public.learn_comments(author_id,article_id,article_title,article_slug,body,parent_id,gif_id)
 values(actor,p_article_id,p_article_title,p_article_slug,trim(p_body),p_parent_id,p_gif_id) returning id into result;
 return result;
end $$;
create or replace function public.learn_comment(p_article_id text,p_article_title text,p_article_slug text,p_body text) returns uuid language sql security definer set search_path='' as $$
 select public.learn_post(p_article_id,p_article_title,p_article_slug,p_body,null,null);
$$;

create function public.learn_react(p_id uuid,p_kind text,p_active boolean) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if p_kind is null or p_kind not in ('love','laugh','mindblown','sparkles','frog') or p_active is null then raise exception 'learn_invalid_reaction'; end if;
 if not public.learn_comment_visible(p_id) then raise exception 'learn_missing_comment'; end if;
 if p_active then
  if (select count(*) from public.learn_comment_reactions where user_id=actor and created_at>now()-interval '1 minute')>=120 then raise exception 'learn_reaction_limit'; end if;
  insert into public.learn_comment_reactions(comment_id,user_id,kind) values(p_id,actor,p_kind) on conflict do nothing;
 else
  delete from public.learn_comment_reactions where comment_id=p_id and user_id=actor and kind=p_kind;
 end if;
end $$;
create or replace function public.learn_report(p_id uuid,p_reason text,p_detail text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not public.learn_comment_visible(p_id) then raise exception 'learn_missing_comment'; end if;
 if (select count(*) from public.learn_comment_reports where reporter_id=actor and created_at>now()-interval '1 hour')>=10 then raise exception 'feedback_report_limit'; end if;
 insert into public.learn_comment_reports(comment_id,reporter_id,reason,detail) values(p_id,actor,p_reason,trim(p_detail)) on conflict(comment_id,reporter_id) do nothing;
end $$;
create or replace function public.learn_moderation() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_admins where user_id=actor) then raise exception 'feedback_admin_only'; end if;
 return jsonb_build_object(
 'comments',coalesce((select jsonb_agg(to_jsonb(c)||jsonb_build_object('author_name',m.display_name,'avatar',m.avatar) order by c.created_at desc) from public.learn_comments c join public.feedback_members m on m.user_id=c.author_id),'[]'::jsonb),
 'reports',coalesce((select jsonb_agg(to_jsonb(r)||jsonb_build_object('body',c.body,'gif_id',c.gif_id,'parent_id',c.parent_id,'author_name',m.display_name,'article_title',c.article_title,'article_slug',c.article_slug) order by r.created_at) from public.learn_comment_reports r join public.learn_comments c on c.id=r.comment_id join public.feedback_members m on m.user_id=c.author_id where not r.resolved),'[]'::jsonb));
end $$;
revoke all on function public.learn_post(text,text,text,text,uuid,text),public.learn_react(uuid,text,boolean) from public,anon,authenticated;
grant execute on function public.learn_post(text,text,text,text,uuid,text),public.learn_react(uuid,text,boolean) to authenticated;
-- Existing discussion/read and moderation grants remain unchanged.
notify pgrst, 'reload schema';
commit;
