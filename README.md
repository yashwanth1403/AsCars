# As Cars - Supabase Setup

React + Vite car inventory platform with:
- public car listings and car details
- admin dashboard for car CRUD and status updates
- lead capture and lead status management
- Supabase storage uploads for car images/videos

## 1) Environment variables

Create a `.env` file in project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use `.env.example` as reference.

## 2) Database and storage bootstrap

Run the SQL in:
- `supabase/migrations/20260528133000_car_platform.sql`

This creates:
- `Car`
- `Carmedia`
- `Offer`
- `Lead`
- `Adminprofile`
- storage buckets: `car-images`, `car-videos`
- RLS policies for public read/lead insert and admin CRUD

## 3) Create admin user

1. Create one auth user in Supabase Auth (email/password).
2. Insert that user's id into `Adminprofile.userid`.

Without `Adminprofile` mapping, admin CRUD and lead management are blocked by RLS.

## 4) Run locally

```sh
npm install
npm run dev
```

## 5) Build check

```sh
npm run build
```

## Key routes

- `/cars` public listing
- `/cars/:slug` public detail
- `/admin/login` admin login
- `/admin` protected admin dashboard
