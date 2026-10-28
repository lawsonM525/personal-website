-- New project replies require enough detail to help the builder.
-- Existing comments keep their original text and visibility.
begin;
create or replace function public.feedback_comment(p_project_id uuid,p_body text) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result uuid;
 clean_body text := btrim(p_body,E' \t\n\r\f'||chr(11));
begin
 if clean_body is null or char_length(clean_body) not between 500 and 2000 then raise exception 'feedback_comment_length'; end if;
 if not exists(select 1 from public.feedback_projects where id=p_project_id and status='approved') then raise exception 'feedback_missing_project'; end if;
 if (select count(*) from public.feedback_comments where author_id=actor and created_at>now()-interval '10 minutes')>=5 then raise exception 'feedback_comment_limit'; end if;
 insert into public.feedback_comments(project_id,author_id,body) values(p_project_id,actor,clean_body) returning id into result; return result;
end $$;
commit;
