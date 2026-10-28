begin;
do $$
declare reviewer uuid:='fa000000-0000-4000-8000-000000000001'; owners uuid[]:=array['fa000000-0000-4000-8000-000000000002','fa000000-0000-4000-8000-000000000003','fa000000-0000-4000-8000-000000000004']::uuid[];
 outsider uuid:='fa000000-0000-4000-8000-000000000005'; admin uuid:='fa000000-0000-4000-8000-000000000006'; projects uuid[]:='{}'; reviews uuid[]:='{}'; p uuid; r uuid; actor uuid; items jsonb; invalid jsonb; stats jsonb; balance_before integer; i integer;
begin
 if has_function_privilege('anon','public.feedback_mark_useful(uuid,integer,boolean)','execute') or has_function_privilege('anon','public.feedback_review_observations(uuid,text,jsonb,integer,text)','execute') or has_function_privilege('authenticated','public.feedback_review(uuid,text,text,text,integer,text)','execute') or has_function_privilege('authenticated','public.feedback_reviewer_stats(uuid)','execute') or has_table_privilege('authenticated','public.feedback_reviews','update') then raise exception 'TEST FAILED: permissions too broad'; end if;
 foreach actor in array array[reviewer,owners[1],owners[2],owners[3],outsider,admin] loop
  insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values(actor,actor::text||'@example.invalid',now(),'{}','{}',now(),now());
  insert into public.feedback_members(user_id,display_name) values(actor,'Quality test builder');
 end loop;
 insert into public.feedback_admins(user_id) values(admin);
 for i in 1..3 loop
  insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status,review_cost) values(owners[i],'Quality test '||i,'https://quality-'||i||'.vercel.app','Web app','People testing a new study planner.','Create a study plan for your next exam.','Is the first step easy to follow?','approved',0) returning id into p;
  projects:=array_append(projects,p);
 end loop;
 select jsonb_agg(jsonb_build_object('where','Screen '||n,'happened','I clicked Save on screen '||n||' but could not tell whether my study plan was saved.','suggestion','On screen '||n||', show a saved confirmation next to the button so the next step is clear.')) into items from generate_series(1,3) n;
 perform set_config('request.jwt.claim.sub',reviewer::text,true);
 insert into public.feedback_assignments(user_id,project_id,expires_at) values(reviewer,projects[1],now()+interval '45 minutes');
 foreach invalid in array array[null::jsonb,'{}'::jsonb,'[]'::jsonb,items-2,jsonb_build_array(items->0,items->0,items->2),jsonb_set(items,'{0,happened}','"looks good"'),jsonb_set(items,'{0,where}','null'),jsonb_set(items,'{0,suggestion}',items->0->'happened')] loop
  begin perform public.feedback_review_observations(projects[1],'I thought this app would help me plan my exam preparation.',invalid,4,'Completed it'); raise exception 'TEST FAILED: invalid observations accepted'; exception when others then if sqlerrm<>'feedback_observations' then raise; end if; end;
 end loop;
 update public.feedback_assignments set expires_at=now()-interval '1 minute' where user_id=reviewer;
 begin perform public.feedback_review_observations(projects[1],'I thought this app would help me plan my exam preparation.',items,4,'Completed it'); raise exception 'TEST FAILED: expired assignment accepted'; exception when others then if sqlerrm<>'feedback_assignment_expired' then raise; end if; end;
 perform public.feedback_renew_assignment(projects[1]);
 if not exists(select 1 from public.feedback_assignments where user_id=reviewer and expires_at>now()+interval '44 minutes') then raise exception 'TEST FAILED: renewal missing'; end if;
 perform public.feedback_release_assignment();
 if exists(select 1 from public.feedback_assignments where user_id=reviewer) then raise exception 'TEST FAILED: release missing'; end if;
 begin perform public.feedback_renew_assignment(projects[1]); raise exception 'TEST FAILED: renewal without assignment'; exception when others then if sqlerrm<>'feedback_assignment_expired' then raise; end if; end;
 for i in 1..3 loop
  insert into public.feedback_assignments(user_id,project_id,expires_at) values(reviewer,projects[i],now()+interval '45 minutes');
  balance_before:=public.feedback_balance(reviewer);
  r:=public.feedback_review_observations(projects[i],'I thought this app would help me plan my exam preparation.',items,4,'Completed it');
  reviews:=array_append(reviews,r);
  if public.feedback_balance(reviewer)<>balance_before+1 then raise exception 'TEST FAILED: publishing did not earn exactly one credit'; end if;
  if exists(select 1 from public.feedback_assignments where user_id=reviewer) then raise exception 'TEST FAILED: published assignment not cleared'; end if;
 end loop;
 if exists(select 1 from public.feedback_reviews where id=any(reviews) and (observations is null or cardinality(useful_observations)<>0)) then raise exception 'TEST FAILED: stored review invalid'; end if;
 begin perform public.feedback_mark_useful(reviews[1],0,true); raise exception 'TEST FAILED: self marking accepted'; exception when others then if sqlerrm<>'feedback_useful_owner' then raise; end if; end;
 perform set_config('request.jwt.claim.sub',outsider::text,true);
 begin perform public.feedback_mark_useful(reviews[1],0,true); raise exception 'TEST FAILED: nonowner marking accepted'; exception when others then if sqlerrm<>'feedback_useful_owner' then raise; end if; end;
 balance_before:=public.feedback_balance(reviewer);
 for i in 1..3 loop
  perform set_config('request.jwt.claim.sub',owners[i]::text,true);
  perform public.feedback_mark_useful(reviews[i],0,true);
  perform public.feedback_mark_useful(reviews[i],0,true);
 end loop;
 perform set_config('request.jwt.claim.sub',owners[1]::text,true);
 perform public.feedback_mark_useful(reviews[1],1,true); perform public.feedback_mark_useful(reviews[1],2,true);
 stats:=public.feedback_reviewer_stats(reviewer);
 if stats<>'{"completed":3,"helpful_reviews":3,"helped_builders":3}'::jsonb then raise exception 'TEST FAILED: reputation double-counted or missing %',stats; end if;
 if public.feedback_balance(reviewer)<>balance_before then raise exception 'TEST FAILED: helpful marks changed credits'; end if;
 begin perform public.feedback_mark_useful(reviews[1],3,true); raise exception 'TEST FAILED: invalid observation marked'; exception when others then if sqlerrm<>'feedback_useful_review' then raise; end if; end;
 perform public.feedback_mark_useful(reviews[1],0,false); perform public.feedback_mark_useful(reviews[1],1,false); perform public.feedback_mark_useful(reviews[1],2,false);
 if (public.feedback_reviewer_stats(reviewer)->>'helpful_reviews')::int<>2 then raise exception 'TEST FAILED: undo missing'; end if;
 perform public.feedback_mark_useful(reviews[1],0,true);
 update public.feedback_members set blocked=true where user_id=owners[1];
 begin perform public.feedback_mark_useful(reviews[1],0,false); raise exception 'TEST FAILED: blocked member marking accepted'; exception when others then if sqlerrm<>'feedback_blocked' then raise; end if; end;
 update public.feedback_members set blocked=false where user_id=owners[1];
 perform set_config('request.jwt.claim.sub',admin::text,true);
 perform public.feedback_moderate('review',reviews[1],'hide');
 if (public.feedback_reviewer_stats(reviewer)->>'helpful_reviews')::int<>2 or public.feedback_balance(reviewer)<>balance_before-1 then raise exception 'TEST FAILED: hidden review still counts'; end if;
 perform set_config('request.jwt.claim.sub',owners[1]::text,true);
 begin perform public.feedback_mark_useful(reviews[1],0,false); raise exception 'TEST FAILED: hidden review marked'; exception when others then if sqlerrm<>'feedback_useful_review' then raise; end if; end;
 perform set_config('request.jwt.claim.sub',admin::text,true);
 perform public.feedback_moderate('review',reviews[1],'restore');
 perform public.feedback_moderate('project',projects[1],'hide');
 if (public.feedback_reviewer_stats(reviewer)->>'helpful_reviews')::int<>2 then raise exception 'TEST FAILED: hidden project still counts'; end if;
 perform public.feedback_moderate('project',projects[1],'restore');
 if (public.feedback_reviewer_stats(reviewer)->>'helpful_reviews')::int<>3 then raise exception 'TEST FAILED: reputation not restored'; end if;
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'reviewers') x where x->>'id'=reviewer::text and x->>'helpful_reviews'='3' and not x ? 'credits') then raise exception 'TEST FAILED: public recognition missing'; end if;
 perform set_config('request.jwt.claim.sub',reviewer::text,true);
 if public.feedback_member()->'reviewer_stats'<>public.feedback_reviewer_stats(reviewer) then raise exception 'TEST FAILED: member stats missing'; end if;
 -- Old reviews can be acknowledged as a whole without inventing observations.
 insert into public.feedback_reviews(project_id,reviewer_id,purpose,confusion,improvement,design_score,outcome) values(projects[1],outsider,repeat('Old purpose ',5),repeat('Old confusion ',5),repeat('Old improvement ',5),3,'Got stuck') returning id into r;
 perform set_config('request.jwt.claim.sub',owners[1]::text,true); perform public.feedback_mark_useful(r,0,true);
 if (public.feedback_reviewer_stats(outsider)->>'helpful_reviews')::int<>1 then raise exception 'TEST FAILED: legacy useful mark missing'; end if;
 begin perform public.feedback_mark_useful(r,1,true); raise exception 'TEST FAILED: nonexistent legacy observation marked'; exception when others then if sqlerrm<>'feedback_useful_review' then raise; end if; end;
 -- Full-length observation text remains intact even in legacy text projections.
 select jsonb_agg(jsonb_build_object('where','Screen '||n,'happened',n::text||repeat('h',999),'suggestion',n::text||repeat('s',999))) into items from generate_series(1,3)n;
 perform set_config('request.jwt.claim.sub',outsider::text,true);
 insert into public.feedback_assignments(user_id,project_id,expires_at) values(outsider,projects[2],now()+interval '45 minutes');
 r:=public.feedback_review_observations(projects[2],repeat('Initial impression ',5),items,3,'Got stuck');
 if (select observations from public.feedback_reviews where id=r)<>items then raise exception 'TEST FAILED: observations truncated'; end if;
end $$;
select 'PASS: three observations, validation, ownership, idempotent useful marks, undo, no bonus credits, recognition, hide/restore, blocked members, expiry/renew/release, legacy reviews, full-length text and private tables' as quality_checks;
rollback;
