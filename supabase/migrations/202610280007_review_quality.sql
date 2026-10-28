begin;
-- Three concrete observations for new reviews; old reviews retain their original text.
create function public.feedback_observations_valid(items jsonb) returns boolean
language plpgsql immutable set search_path='' as $$
declare item jsonb; seen_happened text[]:='{}'; seen_suggestions text[]:='{}'; happened text; suggestion text;
begin
 if items is null or jsonb_typeof(items)<>'array' then return false; end if;
 if jsonb_array_length(items)<>3 then return false; end if;
 for item in select value from jsonb_array_elements(items) loop
  if jsonb_typeof(item)<>'object' or jsonb_typeof(item->'where') is distinct from 'string' or jsonb_typeof(item->'happened') is distinct from 'string' or jsonb_typeof(item->'suggestion') is distinct from 'string' then return false; end if;
  if char_length(trim(item->>'where')) not between 3 and 180 or char_length(trim(item->>'happened')) not between 40 and 1000 or char_length(trim(item->>'suggestion')) not between 40 and 1000 then return false; end if;
  happened:=lower(regexp_replace(trim(item->>'happened'),'\s+',' ','g'));
  suggestion:=lower(regexp_replace(trim(item->>'suggestion'),'\s+',' ','g'));
  if happened=suggestion or happened=any(seen_happened) or suggestion=any(seen_suggestions) then return false; end if;
  seen_happened:=array_append(seen_happened,happened); seen_suggestions:=array_append(seen_suggestions,suggestion);
 end loop;
 return true;
end $$;
alter table public.feedback_reviews add column observations jsonb
 check(observations is null or public.feedback_observations_valid(observations));
alter table public.feedback_reviews add column useful_observations integer[] not null default '{}'
 check(useful_observations <@ array[0,1,2] and cardinality(useful_observations)<=3 and array_position(useful_observations,null) is null);

create function public.feedback_review_observations(p_project_id uuid,p_purpose text,p_observations jsonb,p_design_score integer,p_outcome text) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); result uuid; items jsonb;
begin
 if not public.feedback_observations_valid(p_observations) then raise exception 'feedback_observations'; end if;
 select jsonb_agg(jsonb_build_object('where',trim(x->>'where'),'happened',trim(x->>'happened'),'suggestion',trim(x->>'suggestion')) order by n) into items from jsonb_array_elements(p_observations) with ordinality a(x,n);
 if not exists(select 1 from public.feedback_projects where id=p_project_id and status='approved' and owner_id<>actor) then raise exception 'feedback_not_reviewable'; end if;
 if not exists(select 1 from public.feedback_assignments where user_id=actor and project_id=p_project_id and expires_at>now()) then raise exception 'feedback_assignment_expired'; end if;
 if (select count(*) from public.feedback_reviews where reviewer_id=actor and created_at>now()-interval '24 hours')>=10 then raise exception 'feedback_review_limit'; end if;
 -- Legacy columns remain readable for older clients and moderator report context.
 insert into public.feedback_reviews(project_id,reviewer_id,purpose,confusion,improvement,observations,design_score,outcome)
 values(p_project_id,actor,trim(p_purpose),
  (select left(string_agg((x->>'where')||': '||(x->>'happened'),E'\n\n' order by n),1500) from jsonb_array_elements(items) with ordinality a(x,n)),
  (select left(string_agg((x->>'where')||': '||(x->>'suggestion'),E'\n\n' order by n),1500) from jsonb_array_elements(items) with ordinality a(x,n)),
  items,p_design_score,p_outcome) returning id into result;
 delete from public.feedback_assignments where user_id=actor;
 return result;
exception when unique_violation then raise exception 'feedback_already_reviewed';
end $$;
-- The old RPC is now a private implementation artifact, not a way to skip observations.
revoke execute on function public.feedback_review(uuid,text,text,text,integer,text) from authenticated;

create function public.feedback_mark_useful(p_review_id uuid,p_observation integer,p_useful boolean) returns void
language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor(); project uuid; review public.feedback_reviews;
begin
 select project_id into project from public.feedback_reviews where id=p_review_id;
 perform 1 from public.feedback_projects where id=project and owner_id=actor and status='approved' for update;
 if not found then raise exception 'feedback_useful_owner'; end if;
 select * into review from public.feedback_reviews where id=p_review_id for update;
 if review.status<>'published' or review.reviewer_id=actor or p_useful is null or p_observation is null or p_observation<0 or p_observation>(case when review.observations is null then 0 else 2 end) then raise exception 'feedback_useful_review'; end if;
 update public.feedback_reviews set useful_observations=case when p_useful then
  array(select distinct n from unnest(review.useful_observations||array[p_observation]) n order by n)
  else array_remove(review.useful_observations,p_observation) end where id=p_review_id;
end $$;
create function public.feedback_reviewer_stats(member_id uuid) returns jsonb
language sql stable security definer set search_path='' as $$
 select jsonb_build_object('completed',count(*),'helpful_reviews',count(*) filter(where cardinality(r.useful_observations)>0),
 'helped_builders',count(distinct p.owner_id) filter(where cardinality(r.useful_observations)>0))
 from public.feedback_reviews r join public.feedback_projects p on p.id=r.project_id join public.feedback_members m on m.user_id=r.reviewer_id
 where r.reviewer_id=member_id and r.status='published' and p.status='approved' and not m.blocked;
$$;
create function public.feedback_release_assignment() returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin delete from public.feedback_assignments where user_id=actor; end $$;
create function public.feedback_renew_assignment(p_project_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=public.feedback_actor();
begin
 if not exists(select 1 from public.feedback_projects where id=p_project_id and status='approved' and owner_id<>actor) or exists(select 1 from public.feedback_reviews where project_id=p_project_id and reviewer_id=actor) then raise exception 'feedback_not_reviewable'; end if;
 update public.feedback_assignments set expires_at=now()+interval '45 minutes' where user_id=actor and project_id=p_project_id and expires_at<=now();
 if not found and not exists(select 1 from public.feedback_assignments where user_id=actor and project_id=p_project_id and expires_at>now()) then raise exception 'feedback_assignment_expired'; end if;
end $$;

create or replace function public.feedback_member(p_name text default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid := public.feedback_actor(); result jsonb;
begin
 if p_name is not null then
  if char_length(trim(p_name)) not between 2 and 60 then raise exception 'feedback_name'; end if;
  update public.feedback_members set display_name=trim(p_name) where user_id=actor;
 end if;
 select jsonb_build_object('id',actor,'display_name',m.display_name,'avatar',m.avatar,'credits',public.feedback_balance(actor),'submission_cost',public.feedback_submission_cost(),'reviewer_stats',public.feedback_reviewer_stats(actor),
  'is_admin',exists(select 1 from public.feedback_admins where user_id=actor),
  'own_projects',coalesce((select jsonb_agg(to_jsonb(p)||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at desc) from public.feedback_projects p where p.owner_id=actor),'[]'::jsonb),
  'assignment',(select jsonb_build_object('project_id',a.project_id,'expires_at',a.expires_at) from public.feedback_assignments a join public.feedback_projects p on p.id=a.project_id where a.user_id=actor and a.expires_at>now() and p.status='approved')) into result
 from public.feedback_members m where m.user_id=actor;
 return result;
end $$;
create or replace function public.feedback_board() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object('reviewers',coalesce((select jsonb_agg(x.data order by x.helpful desc,x.completed desc,x.id) from (select m.user_id as id,(s.data->>'helpful_reviews')::int as helpful,(s.data->>'completed')::int as completed,jsonb_build_object('id',m.user_id,'name',m.display_name,'avatar',m.avatar)||s.data as data from public.feedback_members m cross join lateral (select public.feedback_reviewer_stats(m.user_id) as data) s where not m.blocked and (s.data->>'helpful_reviews')::int>0 order by (s.data->>'helpful_reviews')::int desc,(s.data->>'completed')::int desc,m.user_id limit 5) x),'[]'::jsonb),'submission_cost',public.feedback_submission_cost(),'launch_remaining',greatest(0,10-(select count(*) from public.feedback_projects)),
 'projects',coalesce((select jsonb_agg(to_jsonb(p)-'moderation_note'||jsonb_build_object('builder_name',m.display_name,'avatar',m.avatar,'review_count',(select count(*) from public.feedback_reviews r where r.project_id=p.id and r.status='published')) order by p.created_at) from public.feedback_projects p join public.feedback_members m on m.user_id=p.owner_id where p.status='approved'),'[]'::jsonb),
 'reviews',coalesce((select jsonb_agg(to_jsonb(r)-'status'||jsonb_build_object('reviewer_name',m.display_name,'avatar',m.avatar,'reviewer_stats',public.feedback_reviewer_stats(r.reviewer_id)) order by r.created_at desc) from public.feedback_reviews r join public.feedback_members m on m.user_id=r.reviewer_id join public.feedback_projects p on p.id=r.project_id where r.status='published' and p.status='approved'),'[]'::jsonb),
 'comments',coalesce((select jsonb_agg(to_jsonb(c)-'status'||jsonb_build_object('author_name',m.display_name,'avatar',m.avatar) order by c.created_at) from public.feedback_comments c join public.feedback_members m on m.user_id=c.author_id join public.feedback_projects p on p.id=c.project_id where c.status='published' and p.status='approved'),'[]'::jsonb));
$$;

revoke all on function public.feedback_observations_valid(jsonb),public.feedback_review_observations(uuid,text,jsonb,integer,text),public.feedback_mark_useful(uuid,integer,boolean),public.feedback_reviewer_stats(uuid),public.feedback_release_assignment(),public.feedback_renew_assignment(uuid) from public,anon,authenticated;
grant execute on function public.feedback_review_observations(uuid,text,jsonb,integer,text),public.feedback_mark_useful(uuid,integer,boolean),public.feedback_release_assignment(),public.feedback_renew_assignment(uuid) to authenticated;
-- RLS and direct table grants remain unchanged. No public member email or balance is exposed.
notify pgrst,'reload schema';
commit;
