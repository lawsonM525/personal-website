begin;
-- Add Future U’s Lorelei portraits while keeping existing pixel portraits valid.
create or replace function public.member_avatar_valid(value jsonb) returns boolean language plpgsql immutable set search_path='' as $$
declare key text; item text; allowed text[];
begin
 if jsonb_typeof(value) is distinct from 'object' then return false; end if;

 if value->'version'='2'::jsonb then
  if (select count(*) from jsonb_object_keys(value))<>16 or value->>'style' is distinct from 'illustrated' then return false; end if;
  for key,item in select * from jsonb_each_text(value) loop
   allowed:=case key
    when 'version' then array['2']
    when 'style' then array['illustrated']
    when 'hair' then array['none','variant01','variant02','variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant10','variant11','variant12','variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant20','variant21','variant22','variant23','variant24','variant25','variant26','variant27','variant28','variant29','variant30','variant31','variant32','variant33','variant34','variant35','variant36','variant37','variant38','variant39','variant40','variant41','variant42','variant43','variant44','variant45','variant46','variant47','variant48']
    when 'eyes' then array['variant01','variant02','variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant10','variant11','variant12','variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant20','variant21','variant22','variant23','variant24']
    when 'mouth' then array['happy01','happy02','happy03','happy04','happy05','happy06','happy07','happy08','happy09','happy10','happy11','happy12','happy13','happy14','happy15','happy16','happy17','happy18','sad01','sad02','sad03','sad04','sad05','sad06','sad07','sad08','sad09']
    when 'glasses' then array['none','variant01','variant02','variant03','variant04','variant05']
    when 'beard' then array['none','variant01','variant02']
    when 'earrings' then array['none','variant01','variant02','variant03']
    when 'eyebrows' then array['variant01','variant02','variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant10','variant11','variant12','variant13']
    when 'head' then array['variant01','variant02','variant03','variant04']
    when 'nose' then array['variant01','variant02','variant03','variant04','variant05','variant06']
    when 'hairAccessories' then array['none','flowers']
    when 'freckles' then array['none','yes']
    when 'skinColor' then array['ffdbac','f5cfa0','eac393','e0b687','cb9e6e','b68655','a26d3d','8d5524','754425','5c3523','43291f']
    when 'hairColor' then array['18120f','3b2418','603a14','83623b','a78961','cab188','f0d38b','ebebeb','611c17','bd1700','db589b','8054a6','009bbd','43794d']
    when 'backgroundColor' then array['c5e5ef','f6bad8','d9c8f0','cce8b5','f8de8b','f5f0df','0a47d5','008080']
    else null end;
   if allowed is null or item is null or not(item=any(allowed)) then return false; end if;
   if key<>'version' and jsonb_typeof(value->key)<>'string' then return false; end if;
  end loop;
  return true;
 end if;
 if value->'version'<>'1'::jsonb or (select count(*) from jsonb_object_keys(value))<>13 then return false; end if;
 for key,item in select * from jsonb_each_text(value) loop
  allowed:=case key
   when 'version' then array['1']
   when 'hair' then array['none'] || array(select 'short'||lpad(n::text,2,'0') from generate_series(1,24)n) || array(select 'long'||lpad(n::text,2,'0') from generate_series(1,21)n)
   when 'eyes' then array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,12)n)
   when 'mouth' then array(select 'happy'||lpad(n::text,2,'0') from generate_series(1,13)n) || array(select 'sad'||lpad(n::text,2,'0') from generate_series(1,10)n)
   when 'clothing' then array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,23)n)
   when 'glasses' then array['none'] || array(select 'light'||lpad(n::text,2,'0') from generate_series(1,7)n) || array(select 'dark'||lpad(n::text,2,'0') from generate_series(1,7)n)
   when 'hat' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,10)n)
   when 'beard' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,8)n)
   when 'accessories' then array['none'] || array(select 'variant'||lpad(n::text,2,'0') from generate_series(1,4)n)
   when 'skinColor' then array['ffdbac','f5cfa0','eac393','e0b687','cb9e6e','b68655','a26d3d','8d5524','754425','5c3523','43291f']
   when 'hairColor' then array['18120f','3b2418','603a14','83623b','a78961','cab188','f0d38b','ebebeb','611c17','bd1700','db589b','8054a6','009bbd','43794d']
   when 'clothingColor' then array['03396c','0a47d5','428bca','88d8b0','43794d','ff6f69','d11141','ffd969','f2a8cc','8054a6','faf5e9','28282c']
   when 'backgroundColor' then array['c5e5ef','f6bad8','d9c8f0','cce8b5','f8de8b','f5f0df','0a47d5','008080']
   else null end;
  if allowed is null or item is null or not(item=any(allowed)) then return false; end if;
  if key<>'version' and jsonb_typeof(value->key)<>'string' then return false; end if;
 end loop;
 return true;
end $$;
-- Existing validation constraints and RPC-only profile permissions remain in place.
commit;
