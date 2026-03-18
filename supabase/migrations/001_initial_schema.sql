-- Chewawa Order Infrastructure
-- Run this in Supabase SQL Editor once you have a project

-- Orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  stripe_session_id text unique,
  stripe_payment_intent text,
  customer_email text not null,
  customer_name text,
  status text default 'paid' check (status in ('paid','processing','shipped','delivered','cancelled','refunded')),
  total integer not null,
  currency text default 'aud',
  items jsonb not null,
  shipping_address jsonb,
  tracking_number text,
  supplier_notified boolean default false,
  supplier_notified_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscriptions table
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  customer_email text not null,
  customer_name text,
  plan text not null check (plan in ('basic','premium','ultimate')),
  frequency text default 'monthly' check (frequency in ('monthly','biweekly')),
  dog_size text check (dog_size in ('small','medium','large')),
  status text default 'active' check (status in ('active','paused','cancelled','past_due')),
  next_delivery timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Analytics events
create table if not exists analytics_events (
  id uuid default gen_random_uuid() primary key,
  event_type text not null,
  product_id text,
  product_slug text,
  dog_size text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  session_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_orders_email on orders(customer_email);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created on orders(created_at desc);
create index if not exists idx_subscriptions_email on subscriptions(customer_email);
create index if not exists idx_subscriptions_status on subscriptions(status);
create index if not exists idx_analytics_type on analytics_events(event_type);
create index if not exists idx_analytics_product on analytics_events(product_slug);
create index if not exists idx_analytics_created on analytics_events(created_at desc);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at before update on orders
  for each row execute procedure update_updated_at();

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute procedure update_updated_at();
