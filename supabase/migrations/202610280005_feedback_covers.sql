begin;
-- Images stay private until attached to a published project. Existing projects
-- remain valid without a cover; their owners can add one without resubmitting.
create table public.feedback_covers (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references public.feedback_members(user_id),
 created_at timestamptz not null default now()
);
create index feedback_covers_owner_created on public.feedback_covers(owner_id,created_at);
alter table public.feedback_covers enable row level security;
revoke all on public.feedback_covers from public,anon,authenticated;
alter table public.feedback_projects add column cover_id uuid unique references public.feedback_covers(id);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('feedback-covers','feedback-covers',false,1048576,array['image/webp']);

create function public.feedback_cover_access(p_name text,p_write boolean) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.feedback_covers c
 where c.owner_id::text||'/'||c.id::text||'.webp'=p_name and
 case when p_write then c.owner_id=auth.uid() and c.created_at>now()-interval '1 hour'
  and exists(select 1 from public.feedback_members m where m.user_id=c.owner_id and not m.blocked)
 else exists(select 1 from public.feedback_projects p where p.cover_id=c.id and p.status='approved') end);
$$;
revoke all on function public.feedback_cover_access(text,boolean) from public;
grant execute on function public.feedback_cover_access(text,boolean) to anon,authenticated;
create policy feedback_cover_insert on storage.objects for insert to authenticated
 with check(bucket_id='feedback-covers' and public.feedback_cover_access(name,true));
create policy feedback_cover_select on storage.objects for select to anon,authenticated
 using(bucket_id='feedback-covers' and public.feedback_cover_access(name,false));
-- No overwrite, list of private uploads, or delete permissions are granted.

create function public.feedback_cover_begin() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); cover uuid;
begin
 if (select count(*) from public.feedback_covers where owner_id=actor and created_at>now()-interval '24 hours')>=10 then raise exception 'feedback_cover_limit'; end if;
 insert into public.feedback_covers(owner_id) values(actor) returning id into cover;
 return jsonb_build_object('id',cover,'path',actor::text||'/'||cover::text||'.webp');
end $$;

create function public.feedback_cover_valid(p_id uuid,p_actor uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.feedback_covers c join storage.objects o
 on o.bucket_id='feedback-covers' and o.name=c.owner_id::text||'/'||c.id::text||'.webp'
 where c.id=p_id and c.owner_id=p_actor and o.metadata->>'mimetype'='image/webp'
 and (o.metadata->>'size')::bigint between 1 and 1048576);
$$;
revoke all on function public.feedback_cover_valid(uuid,uuid) from public,anon,authenticated;

create function public.feedback_set_cover(p_project_id uuid,p_cover_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_projects where id=p_project_id and owner_id=actor) then raise exception 'feedback_cover_owner'; end if;
 if not public.feedback_cover_valid(p_cover_id,actor) then raise exception 'feedback_cover_missing'; end if;
 if exists(select 1 from public.feedback_projects where cover_id=p_cover_id and id<>p_project_id) then raise exception 'feedback_cover_missing'; end if;
 update public.feedback_projects set cover_id=p_cover_id where id=p_project_id and owner_id=actor;
end $$;

-- Keep the existing credit, duplicate URL and daily-limit implementation as a
-- private helper. Every public submission now requires an owned uploaded cover.
revoke all on function public.feedback_submit(text,text,text,text,text,text) from public,anon,authenticated;
create function public.feedback_submit(p_title text,p_url text,p_category text,p_audience text,p_task text,p_focus text,p_cover_id uuid)
returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); project uuid;
begin
 if not public.feedback_cover_valid(p_cover_id,actor) or exists(select 1 from public.feedback_projects where cover_id=p_cover_id) then raise exception 'feedback_cover_missing'; end if;
 project:=public.feedback_submit(p_title,p_url,p_category,p_audience,p_task,p_focus);
 update public.feedback_projects set cover_id=p_cover_id where id=project;
 return project;
end $$;

create function public.feedback_cover_read(p_id uuid) returns text language sql stable security definer set search_path='' as $$
 select c.owner_id::text||'/'||c.id::text||'.webp' from public.feedback_covers c
 where c.id=p_id and exists(select 1 from public.feedback_projects p where p.cover_id=c.id and p.status='approved');
$$;
revoke all on function public.feedback_cover_begin(),public.feedback_set_cover(uuid,uuid),public.feedback_submit(text,text,text,text,text,text,uuid),public.feedback_cover_read(uuid) from public,anon,authenticated;
grant execute on function public.feedback_cover_begin(),public.feedback_set_cover(uuid,uuid),public.feedback_submit(text,text,text,text,text,text,uuid) to authenticated;
grant execute on function public.feedback_cover_read(uuid) to anon,authenticated;
commit;
