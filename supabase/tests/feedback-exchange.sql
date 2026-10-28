-- Run after the migration. Every test user and test row is rolled back.
begin;
do $$
declare a uuid:='aa000000-0000-4000-8000-000000000001'; b uuid:='bb000000-0000-4000-8000-000000000002'; c uuid:='cc000000-0000-4000-8000-000000000003'; d uuid:='dd000000-0000-4000-8000-000000000004';
 pa uuid; pb uuid; pc uuid; picked uuid; rid uuid; result jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values
 (a,'feedback-test-a@example.invalid',now(),'{}','{}',now(),now()),(b,'feedback-test-b@example.invalid',now(),'{}','{}',now(),now()),(c,'feedback-test-c@example.invalid',now(),'{}','{}',now(),now()),(d,'feedback-test-d@example.invalid',now(),'{}','{}',now(),now());
 insert into public.feedback_members(user_id,display_name,starter_credits) values(a,'Builder A',2),(b,'Builder B',2),(c,'Builder C',0),(d,'Builder D',0);
 perform set_config('request.jwt.claim.sub',a::text,true);
 pa:=public.feedback_submit('App A','https://feedback-test-a.vercel.app/','Web app','People learning to test applications.','Try creating your first study plan for next week.','Check whether the first step is clear.');
 if public.feedback_balance(a)<>0 then raise exception 'TEST FAILED: submission must cost two credits'; end if;
 result:=public.feedback_board();
 if exists(select 1 from jsonb_array_elements(result->'projects') p where p->>'id'=pa::text) then raise exception 'TEST FAILED: pending project is public'; end if;
 begin
  perform public.feedback_submit('App again','https://feedback-test-a2.vercel.app/','Web app','People learning to test applications.','Try creating your first study plan for next week.','Check whether the first step is clear.');
  raise exception 'TEST FAILED: credit spent twice';
 exception when others then if sqlerrm<>'feedback_need_reviews' then raise; end if; end;
 perform set_config('request.jwt.claim.sub',b::text,true);
 pb:=public.feedback_submit('App B','https://feedback-test-b.vercel.app/','Web app','People learning to test applications.','Try creating your first study plan for next week.','Check whether the first step is clear.');
 update public.feedback_projects set status='approved' where id in (pa,pb);
 insert into public.feedback_reviews(project_id,reviewer_id,purpose,confusion,improvement,design_score,outcome) values(pb,d,'I expected a study planner that turns my classes into a daily plan.','I got stuck at the save button because the label looked like a reset action.','I would label the button Save plan and show a confirmation after saving.',4,'Completed it');
 perform set_config('request.jwt.claim.sub',c::text,true);
 picked:=public.feedback_assign();
 if picked<>pa then raise exception 'TEST FAILED: unreviewed app should be assigned first'; end if;
 rid:=public.feedback_review(pa,'I expected a study planner that turns my classes into a daily plan.','I got stuck at the save button because the label looked like a reset action.','I would label the button Save plan and show a confirmation after saving.',4,'Completed it');
 if public.feedback_balance(c)<>1 then raise exception 'TEST FAILED: first review should earn one credit'; end if;
 begin
  perform public.feedback_review(pa,'I expected a study planner that turns my classes into a daily plan.','I got stuck at the save button because the label looked like a reset action.','I would label the button Save plan and show a confirmation after saving.',4,'Completed it');
  raise exception 'TEST FAILED: duplicate review accepted';
 exception when others then if sqlerrm<>'feedback_assignment_expired' then raise; end if; end;
 if public.feedback_balance(c)<>1 then raise exception 'TEST FAILED: duplicate review earned credit'; end if;
 picked:=public.feedback_assign();
 if picked<>pb then raise exception 'TEST FAILED: already-reviewed app reassigned'; end if;
 perform public.feedback_review(pb,'I expected a study planner that turns my classes into a daily plan.','I got stuck at the save button because the label looked like a reset action.','I would label the button Save plan and show a confirmation after saving.',3,'Partly completed it');
 pc:=public.feedback_submit('App C','https://feedback-test-c.vercel.app/','Web app','People learning to test applications.','Try creating your first study plan for next week.','Check whether the first step is clear.');
 if public.feedback_balance(c)<>0 then raise exception 'TEST FAILED: earned credits not spent correctly'; end if;
 perform public.feedback_report('project',pa,'Other','A specific test report to check duplicate reporting.');
 perform public.feedback_report('project',pa,'Other','A second test report should not add another report.');
 if (select count(*) from public.feedback_reports where reporter_id=c and target_id=pa)<>1 then raise exception 'TEST FAILED: duplicate reports accepted'; end if;
 begin perform public.feedback_moderation(); raise exception 'TEST FAILED: member got moderator access'; exception when others then if sqlerrm<>'feedback_admin_only' then raise; end if; end;
 perform set_config('request.jwt.claim.sub',a::text,true);
 begin perform public.feedback_review(pa,'I expected a study planner that turns my classes into a daily plan.','I got stuck at the save button because the label looked like a reset action.','I would label the button Save plan and show a confirmation after saving.',4,'Completed it'); raise exception 'TEST FAILED: self-review accepted'; exception when others then if sqlerrm<>'feedback_not_reviewable' then raise; end if; end;
 insert into public.feedback_admins(user_id) values(b);
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform public.feedback_moderate('review',rid,'hide');
 if public.feedback_balance(c)<>-1 then raise exception 'TEST FAILED: hidden review kept its credit'; end if;
 perform public.feedback_moderate('project',pc,'reject');
 if public.feedback_balance(c)<>1 then raise exception 'TEST FAILED: declined request did not return credits'; end if;
 if has_table_privilege('authenticated','public.feedback_reviews','INSERT') or has_table_privilege('anon','public.feedback_members','SELECT') then raise exception 'TEST FAILED: direct table access granted'; end if;
 if has_function_privilege('anon','public.feedback_submit(text,text,text,text,text,text)','EXECUTE') then raise exception 'TEST FAILED: anonymous submission RPC granted'; end if;
 if not has_function_privilege('anon','public.feedback_board()','EXECUTE') then raise exception 'TEST FAILED: public board not readable'; end if;
 if exists(select 1 from pg_class where relname like 'feedback_%' and relkind='r' and not relrowsecurity) then raise exception 'TEST FAILED: RLS missing'; end if;
 raise notice 'PASS: credit spending, queue priority, duplicate/self-review guards, moderation, refunds, reporting, and table privileges';
end $$;
select 'PASS: credit spending, queue priority, duplicate/self-review guards, moderation, refunds, reporting, and privileges' as feedback_checks;
rollback;
