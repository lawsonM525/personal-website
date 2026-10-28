begin;
-- Older requests keep their original content until their owner adds a summary.
alter table public.feedback_projects add column summary text
 check(summary is null or (char_length(btrim(summary)) between 15 and 180 and summary !~ E'[\r\n]'));

create function public.feedback_submit(p_title text,p_url text,p_category text,p_audience text,p_task text,p_focus text,p_cover_id uuid,p_summary text)
returns uuid language plpgsql security definer set search_path='' as $$
declare project uuid; clean text:=btrim(p_summary);
begin
 if clean is null or char_length(clean) not between 15 and 180 or clean ~ E'[\r\n]' then raise exception 'feedback_summary'; end if;
 project:=public.feedback_submit(p_title,p_url,p_category,p_audience,p_task,p_focus,p_cover_id);
 update public.feedback_projects set summary=clean where id=project;
 return project;
end $$;

create function public.feedback_set_summary(p_project_id uuid,p_summary text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); clean text:=btrim(p_summary);
begin
 if not exists(select 1 from public.feedback_projects where id=p_project_id and owner_id=actor) then raise exception 'feedback_summary_owner'; end if;
 if clean is null or char_length(clean) not between 15 and 180 or clean ~ E'[\r\n]' then raise exception 'feedback_summary'; end if;
 update public.feedback_projects set summary=clean where id=p_project_id and owner_id=actor;
end $$;
revoke all on function public.feedback_submit(text,text,text,text,text,text,uuid,text),public.feedback_set_summary(uuid,text) from public,anon,authenticated;
grant execute on function public.feedback_submit(text,text,text,text,text,text,uuid,text),public.feedback_set_summary(uuid,text) to authenticated;
-- The seven-argument submission RPC remains compatible with already-open tabs.
-- The new form and API require a summary; existing credit/cover checks still run.
commit;
