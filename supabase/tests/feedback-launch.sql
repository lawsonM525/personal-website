begin;
do $$
declare a uuid:='fa000000-0000-4000-8000-000000000001'; b uuid:='fb000000-0000-4000-8000-000000000002'; p uuid; initial_count integer; result jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values
 (a,'launch-test-a@example.invalid',now(),'{}','{}',now(),now()),(b,'launch-test-b@example.invalid',now(),'{}','{}',now(),now());
 insert into public.feedback_members(user_id,display_name) values(a,'Launch A'),(b,'Launch B');
 select count(*) into initial_count from public.feedback_projects;
 if initial_count<10 then
  insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status,review_cost,created_at)
  select b,'Launch fixture '||n,'https://launch-fixture-'||n||'.vercel.app','Web app','People testing the launch threshold.','Try submitting without review credits at launch.','Check the launch credit rules.','rejected',0,now()-interval '2 days' from generate_series(initial_count+1,9)n;
  if public.feedback_submission_cost()<>0 then raise exception 'TEST FAILED: tenth project not free'; end if;
  perform set_config('request.jwt.claim.sub',a::text,true);
  p:=public.feedback_submit('Tenth launch project','https://launch-tenth.vercel.app','Web app','People trying the first ten free requests.','Create a request without reviewing other projects.','Check the launch free submission.');
  if (select review_cost from public.feedback_projects where id=p)<>0 or public.feedback_balance(a)<>0 then raise exception 'TEST FAILED: launch request charged credits'; end if;
  if public.feedback_submission_cost()<>3 then raise exception 'TEST FAILED: review rule did not turn on'; end if;
  if public.feedback_balance(a)<>0 then raise exception 'TEST FAILED: free request gained retroactive debt'; end if;
 end if;
 perform set_config('request.jwt.claim.sub',b::text,true);
 begin perform public.feedback_submit('Eleventh launch project','https://launch-eleventh.vercel.app','Web app','People testing the three review requirement.','Create a request after the launch spots are full.','Check that three reviews are needed.'); raise exception 'TEST FAILED: submitted without three credits'; exception when others then if sqlerrm<>'feedback_need_reviews' then raise; end if; end;
 update public.feedback_members set starter_credits=2 where user_id=b;
 begin perform public.feedback_submit('Eleventh launch project','https://launch-eleventh.vercel.app','Web app','People testing the three review requirement.','Create a request after the launch spots are full.','Check that three reviews are needed.'); raise exception 'TEST FAILED: two credits allowed submission'; exception when others then if sqlerrm<>'feedback_need_reviews' then raise; end if; end;
 update public.feedback_members set starter_credits=3 where user_id=b;
 p:=public.feedback_submit('Eleventh launch project','https://launch-eleventh.vercel.app','Web app','People testing the three review requirement.','Create a request after the launch spots are full.','Check that three reviews are needed.');
 if (select review_cost from public.feedback_projects where id=p)<>3 or public.feedback_balance(b)<>0 then raise exception 'TEST FAILED: three credits not charged exactly once'; end if;
 result:=public.feedback_board();
 if (result->>'submission_cost')::integer<>3 or (result->>'launch_remaining')::integer<>0 then raise exception 'TEST FAILED: client cost disagrees with database'; end if;
 if (public.feedback_member()->>'submission_cost')::integer<>3 then raise exception 'TEST FAILED: profile cost disagrees'; end if;
 begin perform public.feedback_submit('Duplicate daily request','https://launch-daily.vercel.app','Web app','People testing the daily submission limit.','Try creating a second request on the same day.','Keep the per day guard in place.'); raise exception 'TEST FAILED: daily limit bypassed'; exception when others then if sqlerrm not in ('feedback_need_reviews','feedback_submit_limit') then raise; end if; end;
end $$;
select 'PASS: first ten free, eleventh requires three credits, no retroactive debt, exact charging, and public launch state' as launch_checks;
rollback;
