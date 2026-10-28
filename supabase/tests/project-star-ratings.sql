-- Run in an isolated transaction. No committed test content or account changes.
begin;
do $$
declare reviewer uuid:='fc000000-0000-4000-8000-000000000091'; owner uuid:='fc000000-0000-4000-8000-000000000092'; actor uuid; p uuid; r uuid; c uuid; legacy uuid; invalid jsonb; items jsonb; scores jsonb:='{"design":5,"usability":3,"usefulness":4}'; before_balance integer;
begin
 if has_function_privilege('anon','public.feedback_review_ratings(uuid,text,jsonb,jsonb,text)','execute') or has_function_privilege('anon','public.feedback_comment_ratings(uuid,text,jsonb)','execute') or has_function_privilege('authenticated','public.feedback_ratings_valid(jsonb)','execute') or has_table_privilege('authenticated','public.feedback_reviews','UPDATE') then raise exception 'TEST FAILED: permissions expanded'; end if;
 if not has_function_privilege('authenticated','public.feedback_review_ratings(uuid,text,jsonb,jsonb,text)','execute') or not has_function_privilege('authenticated','public.feedback_comment_ratings(uuid,text,jsonb)','execute') then raise exception 'TEST FAILED: required RPC unavailable'; end if;
 foreach invalid in array array[null::jsonb,'[]'::jsonb,'{}'::jsonb,'{"design":5,"usability":3}'::jsonb,'{"design":0,"usability":3,"usefulness":4}'::jsonb,'{"design":5,"usability":6,"usefulness":4}'::jsonb,'{"design":5,"usability":3.5,"usefulness":4}'::jsonb,'{"design":"5","usability":3,"usefulness":4}'::jsonb,'{"design":5,"usability":3,"usefulness":4,"extra":1}'::jsonb] loop
  if public.feedback_ratings_valid(invalid) then raise exception 'TEST FAILED: invalid ratings accepted'; end if;
 end loop;
 if not public.feedback_ratings_valid(scores) or not public.feedback_ratings_valid('{"design":1,"usability":1,"usefulness":1}') then raise exception 'TEST FAILED: valid scores rejected'; end if;
 foreach actor in array array[reviewer,owner] loop
  insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values(actor,actor::text||'@example.invalid',now(),'{}','{}',now(),now());
  insert into public.feedback_members(user_id,display_name) values(actor,'Star ratings test');
 end loop;
 insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status,review_cost) values(owner,'Star ratings fixture','https://star-ratings-fixture.vercel.app','Web app','People testing specific project feedback.','Try saving a project and finding it again.','Is the design and first step clear?','approved',0) returning id into p;
 insert into public.feedback_comments(project_id,author_id,body) values(p,owner,'An older short follow-up keeps its text.') returning id into legacy;
 select jsonb_agg(jsonb_build_object('where','Screen '||n,'happened','On screen '||n||', I could not tell whether the Save button had saved the project.','suggestion','On screen '||n||', add a visible confirmation beside Save so the outcome is clear.')) into items from generate_series(1,3)n;
 perform set_config('request.jwt.claim.sub',reviewer::text,true);
 insert into public.feedback_assignments(user_id,project_id,expires_at) values(reviewer,p,now()+interval '45 minutes');
 before_balance:=public.feedback_balance(reviewer);
 begin perform public.feedback_review_ratings(p,'I expected a project planner that makes the next action easy to find.',items,'{"design":5}', 'Completed it'); raise exception 'TEST FAILED: partial review ratings accepted'; exception when others then if sqlerrm<>'feedback_ratings' then raise; end if; end;
 if not exists(select 1 from public.feedback_assignments where user_id=reviewer) or public.feedback_balance(reviewer)<>before_balance then raise exception 'TEST FAILED: rejected review changed assignment or credits'; end if;
 r:=public.feedback_review_ratings(p,'I expected a project planner that makes the next action easy to find.',items,scores,'Completed it');
 if not exists(select 1 from public.feedback_reviews where id=r and ratings=scores and design_score=5) or public.feedback_balance(reviewer)<>before_balance+1 or exists(select 1 from public.feedback_assignments where user_id=reviewer) then raise exception 'TEST FAILED: rated review did not preserve publishing rules'; end if;
 before_balance:=public.feedback_balance(reviewer);
 c:=public.feedback_comment_ratings(p,repeat('A specific observation about the design and first-use experience. ',9),scores);
 if not exists(select 1 from public.feedback_comments where id=c and ratings=scores) or public.feedback_balance(reviewer)<>before_balance then raise exception 'TEST FAILED: comment ratings missing or earned credits'; end if;
 begin perform public.feedback_comment_ratings(p,repeat('a',499),scores); raise exception 'TEST FAILED: short rated reply accepted'; exception when others then if sqlerrm<>'feedback_comment_length' then raise; end if; end;
 perform set_config('request.jwt.claim.sub',owner::text,true);
 begin perform public.feedback_comment_ratings(p,repeat('a',500),scores); raise exception 'TEST FAILED: builder rated own project'; exception when others then if sqlerrm<>'feedback_self_rating' then raise; end if; end;
 c:=public.feedback_comment_ratings(p,repeat('A follow-up explaining what I changed after receiving feedback. ',9),null);
 if not exists(select 1 from public.feedback_comments where id=c and ratings is null) or not exists(select 1 from public.feedback_comments where id=legacy and ratings is null and body='An older short follow-up keeps its text.') then raise exception 'TEST FAILED: follow-ups or old feedback changed'; end if;
 update public.feedback_members set blocked=true where user_id=owner;
 begin perform public.feedback_comment_ratings(p,repeat('a',500),null); raise exception 'TEST FAILED: blocked member posted'; exception when others then if sqlerrm<>'feedback_blocked' then raise; end if; end;
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'reviews') x where x->>'id'=r::text and x->'ratings'=scores) then raise exception 'TEST FAILED: public rating display data missing'; end if;
end $$;
select 'PASS: strict scores, rated reviews and replies, no self-rating, optional follow-ups, legacy text, credits, assignments, blocked members, length checks, public data and private permissions' as star_rating_checks;
rollback;
