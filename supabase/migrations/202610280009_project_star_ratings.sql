-- Three independent star ratings for new feedback; historical feedback stays unscored.
begin;
create function public.feedback_ratings_valid(items jsonb) returns boolean
language plpgsql immutable set search_path='' as $$
declare category text; score numeric;
begin
 if items is null or jsonb_typeof(items)<>'object' then return false; end if;
 if (select count(*) from jsonb_object_keys(items))<>3 then return false; end if;
 foreach category in array array['design','usability','usefulness'] loop
  if jsonb_typeof(items->category) is distinct from 'number' then return false; end if;
  score:=(items->>category)::numeric;
  if score not between 1 and 5 or score<>trunc(score) then return false; end if;
 end loop;
 return true;
end $$;
alter table public.feedback_reviews add column ratings jsonb check(ratings is null or public.feedback_ratings_valid(ratings));
alter table public.feedback_comments add column ratings jsonb check(ratings is null or public.feedback_ratings_valid(ratings));

create function public.feedback_review_ratings(p_project_id uuid,p_purpose text,p_observations jsonb,p_ratings jsonb,p_outcome text) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid;
begin
 if not public.feedback_ratings_valid(p_ratings) then raise exception 'feedback_ratings'; end if;
 -- Reuse verified-member, assignment, observation, rate-limit and credit rules.
 result:=public.feedback_review_observations(p_project_id,p_purpose,p_observations,(p_ratings->>'design')::numeric::integer,p_outcome);
 update public.feedback_reviews set ratings=p_ratings where id=result and reviewer_id=actor;
 return result;
end $$;
create function public.feedback_comment_ratings(p_project_id uuid,p_body text,p_ratings jsonb) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid;
begin
 if p_ratings is not null then
  if not public.feedback_ratings_valid(p_ratings) then raise exception 'feedback_ratings'; end if;
  if exists(select 1 from public.feedback_projects where id=p_project_id and owner_id=actor) then raise exception 'feedback_self_rating'; end if;
 end if;
 -- Follow-ups may omit ratings. Existing reply length and publishing rules remain.
 result:=public.feedback_comment(p_project_id,p_body);
 update public.feedback_comments set ratings=p_ratings where id=result and author_id=actor;
 return result;
end $$;
revoke all on function public.feedback_ratings_valid(jsonb),public.feedback_review_ratings(uuid,text,jsonb,jsonb,text),public.feedback_comment_ratings(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.feedback_review_ratings(uuid,text,jsonb,jsonb,text),public.feedback_comment_ratings(uuid,text,jsonb) to authenticated;
-- Older open forms may still use the existing RPCs. No extra table grants.
commit;
