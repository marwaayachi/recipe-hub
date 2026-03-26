create table if not exists categories (
  id bigint primary key generated always as identity,
  name text not null unique
);