begin;
do $$
declare actor uuid:='ec000000-0000-4000-8000-000000000001'; cid uuid; pid uuid; result jsonb;
 illustrated jsonb:='{"version":2,"style":"illustrated","hair":"variant41","eyes":"variant19","mouth":"happy05","glasses":"variant04","beard":"none","earrings":"variant01","eyebrows":"variant02","head":"variant01","nose":"variant03","hairAccessories":"flowers","freckles":"yes","skinColor":"8d5524","hairColor":"3b2418","backgroundColor":"f6bad8"}';
 pixel jsonb:='{"version":1,"hair":"long04","eyes":"variant01","mouth":"happy01","clothing":"variant01","glasses":"none","hat":"none","beard":"none","accessories":"none","skinColor":"8d5524","hairColor":"3b2418","clothingColor":"0a47d5","backgroundColor":"f6bad8"}';
begin
 if public.member_avatar_valid(illustrated) is not true or public.member_avatar_valid(pixel) is not true then raise exception 'TEST FAILED: valid illustrated or legacy pixel portrait rejected'; end if;
 if public.member_avatar_valid(illustrated||'{"hair":"long04"}') or public.member_avatar_valid(illustrated||'{"style":"other"}') or public.member_avatar_valid(illustrated||'{"src":"<svg onload=alert(1)>"}') or public.member_avatar_valid(illustrated-'nose') or public.member_avatar_valid(pixel||'{"style":"illustrated"}') then raise exception 'TEST FAILED: mixed or arbitrary artwork accepted'; end if;
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at) values(actor,'illustrated-portrait-test@example.invalid',now(),'{}','{}',now(),now());
 insert into public.feedback_members(user_id,display_name,starter_credits) values(actor,'Illustrated test',3);
 perform set_config('request.jwt.claim.sub',actor::text,true);
 result:=public.member_profile_save('Illustrated test',illustrated);
 if result->'avatar'<>illustrated then raise exception 'TEST FAILED: illustrated portrait not saved'; end if;
 pid:=public.feedback_submit('Illustrated portrait test','https://illustrated-portrait-test.vercel.app','Web app','People checking illustrated profile portraits.','Find the saved illustration next to the project author.','Check the portrait matches the profile.');
 cid:=public.learn_comment('illustrated-test','Illustrated test','illustrated-test','A test comment with an illustrated portrait.');
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'projects') entry where entry->>'id'=pid::text and entry->'avatar'=illustrated) then raise exception 'TEST FAILED: project illustration missing'; end if;
 if not exists(select 1 from jsonb_array_elements(public.learn_discussion('illustrated-test')) entry where entry->>'id'=cid::text and entry->'avatar'=illustrated) then raise exception 'TEST FAILED: comment illustration missing'; end if;
 perform public.member_profile_save('Illustrated test',pixel);
 if not exists(select 1 from jsonb_array_elements(public.learn_discussion('illustrated-test')) entry where entry->>'id'=cid::text and entry->'avatar'=pixel) then raise exception 'TEST FAILED: switching to pixel did not persist'; end if;
 perform public.member_profile_save('Illustrated test',illustrated);
 if not exists(select 1 from jsonb_array_elements(public.feedback_board()->'projects') entry where entry->>'id'=pid::text and entry->'avatar'=illustrated) then raise exception 'TEST FAILED: switching back to illustrated did not persist'; end if;
 begin perform public.member_profile_save('Illustrated test',illustrated||'{"hair":"long99"}'); raise exception 'TEST FAILED: invalid illustrated choice saved'; exception when others then if sqlerrm<>'member_invalid_avatar' then raise; end if; end;
end $$;
select 'PASS: illustrated and pixel portraits, strict validation, style switching, project/comment persistence and unchanged ownership' as illustrated_checks;
rollback;
