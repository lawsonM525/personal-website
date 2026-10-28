begin;
do $$
declare a uuid:='fd000000-0000-4000-8000-000000000001'; b uuid:='fd000000-0000-4000-8000-000000000002'; c uuid; p uuid; legacy uuid; balance_before integer; invalid text;
begin
 if has_function_privilege('anon','public.feedback_set_summary(uuid,text)','execute') or has_table_privilege('authenticated','public.feedback_projects','update') then raise exception 'TEST FAILED: summary permissions too broad'; end if;
 if not has_function_privilege('authenticated','public.feedback_submit(text,text,text,text,text,text,uuid)','execute') then raise exception 'TEST FAILED: existing open forms broken'; end if;
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values
 (a,'summary-test-a@example.invalid',now(),'{}','{}',now(),now()),(b,'summary-test-b@example.invalid',now(),'{}','{}',now(),now());
 insert into public.feedback_members(user_id,display_name,starter_credits) values(a,'Summary A',3),(b,'Summary B',3);
 insert into public.feedback_covers(owner_id) values(a) returning id into c;
 insert into storage.objects(bucket_id,name,metadata) values('feedback-covers',a::text||'/'||c::text||'.webp','{"size":12000,"mimetype":"image/webp"}');
 perform set_config('request.jwt.claim.sub',a::text,true);
 foreach invalid in array array[null::text,'','An app',repeat('x',181),E'A study planner\nwith a weekly calendar.'] loop
  begin perform public.feedback_submit('Summary project','https://summary-project.vercel.app','Web app','Students planning their exam preparation.','Create a study plan for your next exam.','Is the first step easy to follow?',c,invalid); raise exception 'TEST FAILED: invalid summary accepted'; exception when others then if sqlerrm<>'feedback_summary' then raise; end if; end;
 end loop;
 p:=public.feedback_submit('Summary project','https://summary-project.vercel.app','Web app','Students planning their exam preparation.','Create a study plan for your next exam.','Is the first step easy to follow?',c,'  A study planner that turns exam dates into a weekly plan.  ');
 if (select summary from public.feedback_projects where id=p)<>'A study planner that turns exam dates into a weekly plan.' then raise exception 'TEST FAILED: summary not saved or trimmed'; end if;
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'projects') x where x->>'id'=p::text and x->>'summary'='A study planner that turns exam dates into a weekly plan.') then raise exception 'TEST FAILED: summary missing from public board'; end if;
 balance_before:=public.feedback_balance(a);
 perform public.feedback_set_summary(p,'A weekly planner for calmer exam preparation.');
 if public.feedback_balance(a)<>balance_before then raise exception 'TEST FAILED: editing summary charged credits'; end if;
 if not exists(select 1 from jsonb_array_elements(public.feedback_member()->'own_projects') x where x->>'id'=p::text and x->>'summary'='A weekly planner for calmer exam preparation.') then raise exception 'TEST FAILED: owner view missing saved summary'; end if;
 begin update public.feedback_projects set summary=E'A multiline summary\nis not a single line.' where id=p; raise exception 'TEST FAILED: table accepts multiline summary'; exception when check_violation then null; end;
 foreach invalid in array array[null::text,'short',repeat('x',181),E'A summary\nwith a newline in it.'] loop
  begin perform public.feedback_set_summary(p,invalid); raise exception 'TEST FAILED: invalid edit accepted'; exception when others then if sqlerrm<>'feedback_summary' then raise; end if; end;
 end loop;
 perform set_config('request.jwt.claim.sub',b::text,true);
 begin perform public.feedback_set_summary(p,'A summary changed by the wrong project owner.'); raise exception 'TEST FAILED: nonowner edited summary'; exception when others then if sqlerrm<>'feedback_summary_owner' then raise; end if; end;
 insert into public.feedback_covers(owner_id) values(b) returning id into c;
 insert into storage.objects(bucket_id,name,metadata) values('feedback-covers',b::text||'/'||c::text||'.webp','{"size":12000,"mimetype":"image/webp"}');
 legacy:=public.feedback_submit('Legacy form project','https://summary-legacy.vercel.app','Web app','Builders with an already-open submission form.','Open the app and try the first step.','Can you tell what to do first?',c);
 if (select summary from public.feedback_projects where id=legacy) is not null then raise exception 'TEST FAILED: older request summary fabricated'; end if;
 balance_before:=public.feedback_balance(b);
 perform public.feedback_set_summary(legacy,'A project submitted from a previously opened form.');
 if public.feedback_balance(b)<>balance_before then raise exception 'TEST FAILED: adding legacy summary charged credits'; end if;
 update public.feedback_members set blocked=true where user_id=b;
 begin perform public.feedback_set_summary(legacy,'A blocked account trying to edit its project.'); raise exception 'TEST FAILED: blocked account edited summary'; exception when others then if sqlerrm<>'feedback_blocked' then raise; end if; end;
end $$;
select 'PASS: required single-line summary, public/owner reads, owner-only edits, no extra credits, legacy forms and blocked members' as summary_checks;
rollback;
