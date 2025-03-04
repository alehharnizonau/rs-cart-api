--create extension if not exists "uuid-ossp";
--
--create type cartstatus as enum ('OPEN', 'ORDERED');
--
--drop table if exists users cascade;
--
--create table users (
--   id uuid primary key default uuid_generate_v4(),
--   name text,
--   email text,
--   password text
--);
--
--drop table if exists carts cascade;
--
--create table carts (
--	id uuid primary key default uuid_generate_v4(),
--	user_id uuid not null,
--	created_at date not null,
--	updated_at date not null,
--	status cartstatus not null,
--	foreign key("user_id") references "users" ("id")
--);
--
--drop table if exists stocks cascade;
--
--create table stocks (
--   id uuid primary key default uuid_generate_v4(),
--   count integer not null
--);
--
--drop table if exists products cascade;
--
--create table products (
--   id uuid primary key default uuid_generate_v4(),
--   title text not null,
--   description text,
--   price integer,
--   stocks_id uuid,
--   foreign key ("stocks_id") references "stocks" ("id")
--);
--
--drop table if exists cart_items cascade;
--
--create table cart_items (
--	id uuid primary key default uuid_generate_v4() ,
--	cart_id uuid,
--	product_id uuid,
--	count integer,
--	foreign key ("cart_id") references "carts" ("id"),
--	foreign key ("product_id") references "products" ("id")
--);
--
--drop table if exists orders cascade;
--
--create table orders (
--   id uuid primary key default uuid_generate_v4(),
--   user_id uuid,
--   cart_id uuid,
--   payment json,
--   delivery json,
--   comments text,
--   status cartstatus,
--   total numeric,
--   foreign key ("cart_id") references "carts" ("id"),
--   foreign key ("user_id") references "users" ("id")
--);

--insert into users (id, name, email, password) values
--('68280373-622a-4f24-8752-97905658958c','Oleg', 'olegarnizonov@gmail.com', 'qwerty4321'),
--
--insert into carts (id, user_id, created_at, updated_at, status) values
--('a58409a4-3d08-4a9e-b5a3-69c9a2aefc00', '68280373-622a-4f24-8752-97905658958c', '2023-05-21', '2023-05-21', 'OPEN'),
--('6f5d7302-0334-40ef-8b9d-92ff361e9742', '68280373-622a-4f24-8752-97905658958c', '2023-05-19', '2023-05-21', 'ORDERED');
--

--insert into stocks (id, count) values
--('3eb48f63-4783-4c06-92ef-3bc7ae7949b9', 15),
--('56610fa2-dedf-44b4-a6d6-597dc0ee340e', 40);

--insert into products (id, title, description, price, stocks_id) values
--('c582d9ea-eea7-4f4e-977f-6209f7cfcf68','Test Product 1', 'Description product 1', 20, '3eb48f63-4783-4c06-92ef-3bc7ae7949b9'),
--('d6426806-cec0-48c5-9985-b06967a0cf8b', 'Test Product 2', 'Description product 2', 10, '56610fa2-dedf-44b4-a6d6-597dc0ee340e');

--insert into cart_items (cart_id, product_id, count) values
--('a58409a4-3d08-4a9e-b5a3-69c9a2aefc00', 'c582d9ea-eea7-4f4e-977f-6209f7cfcf68', 5),
--('6f5d7302-0334-40ef-8b9d-92ff361e9742', 'c582d9ea-eea7-4f4e-977f-6209f7cfcf68', 10),
--('6f5d7302-0334-40ef-8b9d-92ff361e9742', 'd6426806-cec0-48c5-9985-b06967a0cf8b', 2),
--('a58409a4-3d08-4a9e-b5a3-69c9a2aefc00', 'd6426806-cec0-48c5-9985-b06967a0cf8b', 14);
