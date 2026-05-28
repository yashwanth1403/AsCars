create extension if not exists "pgcrypto";

create table if not exists "Car" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  year integer not null check (year >= 1990),
  km integer not null default 0 check (km >= 0),
  fuel text not null check (fuel in ('Petrol', 'Diesel', 'CNG', 'Electric')),
  transmission text not null check (transmission in ('Manual', 'Automatic')),
  price integer not null default 0 check (price >= 0),
  emi integer,
  description text,
  status text not null default 'available' check (status in ('available', 'sold')),
  ispublished boolean not null default true,
  createdat timestamptz not null default now(),
  updatedat timestamptz not null default now()
);

create table if not exists "Carmedia" (
  id uuid primary key default gen_random_uuid(),
  carid uuid not null references "Car"(id) on delete cascade,
  mediatype text not null check (mediatype in ('image', 'video')),
  storagepath text not null,
  publicurl text not null,
  sortorder integer not null default 0,
  iscover boolean not null default false,
  createdat timestamptz not null default now()
);

create table if not exists "Offer" (
  id uuid primary key default gen_random_uuid(),
  carid uuid not null references "Car"(id) on delete cascade,
  title text not null,
  description text,
  offerprice integer,
  discountamount integer,
  startsat timestamptz,
  endsat timestamptz,
  isactive boolean not null default true,
  createdat timestamptz not null default now(),
  updatedat timestamptz not null default now()
);

create table if not exists "Lead" (
  id uuid primary key default gen_random_uuid(),
  carid uuid references "Car"(id) on delete set null,
  source text not null check (source in ('contact', 'sell', 'cardetail')),
  status text not null default 'new' check (status in ('new', 'contacted', 'negotiation', 'closed_won', 'closed_lost')),
  name text not null,
  phone text not null,
  email text,
  subject text,
  message text,
  payload jsonb,
  createdat timestamptz not null default now(),
  updatedat timestamptz not null default now()
);

create table if not exists "Adminprofile" (
  id uuid primary key default gen_random_uuid(),
  userid uuid not null unique references auth.users(id) on delete cascade,
  name text,
  createdat timestamptz not null default now()
);

create index if not exists idx_car_status on "Car"(status);
create index if not exists idx_car_brand on "Car"(brand);
create index if not exists idx_car_year on "Car"(year);
create index if not exists idx_car_price on "Car"(price);
create index if not exists idx_car_createdat on "Car"(createdat desc);

create index if not exists idx_lead_status on "Lead"(status);
create index if not exists idx_lead_source on "Lead"(source);
create index if not exists idx_lead_createdat on "Lead"(createdat desc);

alter table "Car" enable row level security;
alter table "Carmedia" enable row level security;
alter table "Offer" enable row level security;
alter table "Lead" enable row level security;
alter table "Adminprofile" enable row level security;

create policy "public_read_car" on "Car"
for select to anon, authenticated
using (ispublished = true and status = 'available');

create policy "admin_manage_car" on "Car"
for all to authenticated
using (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()))
with check (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()));

create policy "public_read_carmedia" on "Carmedia"
for select to anon, authenticated
using (
  exists (
    select 1 from "Car" c where c.id = carid and c.ispublished = true and c.status = 'available'
  )
);

create policy "admin_manage_carmedia" on "Carmedia"
for all to authenticated
using (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()))
with check (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()));

create policy "public_read_offer" on "Offer"
for select to anon, authenticated
using (
  isactive = true
  and exists (
    select 1 from "Car" c where c.id = carid and c.ispublished = true and c.status = 'available'
  )
);

create policy "admin_manage_offer" on "Offer"
for all to authenticated
using (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()))
with check (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()));

create policy "public_insert_lead" on "Lead"
for insert to anon, authenticated
with check (source in ('contact', 'sell', 'cardetail'));

create policy "admin_read_lead" on "Lead"
for select to authenticated
using (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()));

create policy "admin_update_lead" on "Lead"
for update to authenticated
using (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()))
with check (exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid()));

create policy "admin_manage_adminprofile" on "Adminprofile"
for all to authenticated
using (userid = auth.uid())
with check (userid = auth.uid());

insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('car-videos', 'car-videos', true)
on conflict (id) do nothing;

create policy "public_read_car_images" on storage.objects
for select to anon, authenticated
using (bucket_id = 'car-images');

create policy "admin_write_car_images" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'car-images'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
);

create policy "admin_update_car_images" on storage.objects
for update to authenticated
using (
  bucket_id = 'car-images'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
)
with check (
  bucket_id = 'car-images'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
);

create policy "public_read_car_videos" on storage.objects
for select to anon, authenticated
using (bucket_id = 'car-videos');

create policy "admin_write_car_videos" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'car-videos'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
);

create policy "admin_update_car_videos" on storage.objects
for update to authenticated
using (
  bucket_id = 'car-videos'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
)
with check (
  bucket_id = 'car-videos'
  and exists (select 1 from "Adminprofile" ap where ap.userid = auth.uid())
);
