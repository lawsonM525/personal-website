-- Disposable fixtures only. Every inserted user, project and reply rolls back.
begin;
do $$
declare actor uuid:='fb000000-0000-4000-8000-000000000081'; p uuid; c uuid; legacy uuid; bad text; initial_balance integer;
begin
 if has_function_privilege('anon','public.feedback_comment(uuid,text)','execute') or not has_function_privilege('authenticated','public.feedback_comment(uuid,text)','execute') or has_table_privilege('authenticated','public.feedback_comments','INSERT') then raise exception 'TEST FAILED: comment permissions changed'; end if;
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values(actor,'guided-replies-test@example.invalid',now(),'{}','{}',now(),now());
 insert into public.feedback_members(user_id,display_name) values(actor,'Guided replies test');
 insert into public.feedback_projects(owner_id,title,url,category,audience,task,focus,status,review_cost) values(actor,'Guided replies fixture','https://guided-replies-fixture.vercel.app','Web app','People testing project feedback.','Try the project and describe a specific moment.','How clear is the design and first step?','approved',0) returning id into p;
 insert into public.feedback_comments(project_id,author_id,body) values(p,actor,'A historical short follow-up stays published.') returning id into legacy;
 perform set_config('request.jwt.claim.sub',actor::text,true);
 initial_balance:=public.feedback_balance(actor);
 foreach bad in array array[null::text,repeat('a',499),repeat(' ',500),E' \n'||repeat('a',499)||E'\t ',repeat('😀',250),repeat('a',2001)] loop
  begin perform public.feedback_comment(p,bad); raise exception 'TEST FAILED: invalid reply accepted'; exception when others then if sqlerrm<>'feedback_comment_length' then raise; end if; end;
 end loop;
 c:=public.feedback_comment(p,E' \n'||repeat('a',500)||E'\t ');
 if (select body from public.feedback_comments where id=c)<>repeat('a',500) then raise exception 'TEST FAILED: 500-character boundary or trimming failed'; end if;
 perform public.feedback_comment(p,repeat('b',2000));
 perform public.feedback_comment(p,repeat('😀',500));
 begin perform public.feedback_comment('00000000-0000-4000-8000-000000000000',repeat('a',500)); raise exception 'TEST FAILED: missing project accepted'; exception when others then if sqlerrm<>'feedback_missing_project' then raise; end if; end;
 update public.feedback_members set blocked=true where user_id=actor;
 begin perform public.feedback_comment(p,repeat('a',500)); raise exception 'TEST FAILED: blocked member posted'; exception when others then if sqlerrm<>'feedback_blocked' then raise; end if; end;
 update public.feedback_members set blocked=false where user_id=actor;
 perform public.feedback_comment(p,repeat('d',500));
 begin perform public.feedback_comment(p,repeat('e',500)); raise exception 'TEST FAILED: rate limit bypassed'; exception when others then if sqlerrm<>'feedback_comment_limit' then raise; end if; end;
 if public.feedback_balance(actor)<>initial_balance then raise exception 'TEST FAILED: replies changed review credits'; end if;
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'comments') x where x->>'id'=legacy::text and x->>'body'='A historical short follow-up stays published.') then raise exception 'TEST FAILED: historical reply changed'; end if;
end $$;
select 'PASS: 500/2000 boundaries, trimmed whitespace, Unicode, preserved historical replies, blocked users, project visibility, rate limit, no credit rewards and unchanged permissions' as guided_reply_checks;
rollback;
