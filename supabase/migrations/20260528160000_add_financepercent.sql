-- Additive migration: finance percentage (0–100), e.g. 90% finance available
alter table "Car"
add column if not exists financepercent integer
check (financepercent is null or (financepercent >= 0 and financepercent <= 100));
