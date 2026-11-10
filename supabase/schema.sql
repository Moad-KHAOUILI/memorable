
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  room text not null,
  date_of_birth date not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

alter table public.patients enable row level security;

drop policy if exists "Public read for demo" on public.patients;
drop policy if exists "Staff can read patients" on public.patients;
create policy "Staff can read patients" on public.patients
  for select to authenticated using (true);

insert into public.patients (first_name, last_name, room, date_of_birth, notes)
select * from (values
  ('Eleanor', 'Pena', '103', date '1940-06-02', 'Lisinopril in the morning. Likes to read the newspaper.'),
  ('Esther', 'Howard', '104', date '1937-11-19', 'Thyroid medication before breakfast.'),
  ('Marvin', 'Reid', '106', date '1939-03-08', 'Low-dose aspirin. Walks with a cane.'),
  ('Albert', 'Flores', '107', date '1942-08-25', 'Diabetic — insulin injection at noon.')
) as v(first_name, last_name, room, date_of_birth, notes)
where not exists (select 1 from public.patients p where p.first_name = v.first_name and p.last_name = v.last_name);

create table if not exists public.staff (
  id uuid primary key references auth.users (id) on delete cascade,
  title text not null default '',
  first_name text not null,
  last_name text not null,
  email text not null unique,
  role text not null default 'Nurse',
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;

drop policy if exists "Staff directory is readable" on public.staff;
create policy "Staff directory is readable" on public.staff
  for select using (true);

drop policy if exists "Staff can update their own profile" on public.staff;
create policy "Staff can update their own profile" on public.staff
  for update to authenticated using (auth.uid() = id);

create or replace function public.handle_new_staff()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.staff (id, title, first_name, last_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'title', ''),
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'Nurse')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_staff();
