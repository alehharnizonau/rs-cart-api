create extension if not exists "uuid-ossp";

create type cartstatus as enum ('OPEN', 'ORDERED');

drop table carts;

create table carts (
	id uuid primary key not null,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status cartstatus not null
);

drop table cart_items;

create table cart_items (
	id uuid not null primary key,
	cart_id uuid not null,
	foreign key (cart_id) references carts(id),
	product_id uuid,
	count integer
);

insert into carts (id, user_id, created_at, updated_at, status) values
  (uuid_generate_v4(), uuid_generate_v4(), '2023-05-14', '2023-05-14', 'OPEN'),
  (uuid_generate_v4(), uuid_generate_v4(), '2023-05-13', '2023-05-14', 'ORDERED');

insert into cart_items (id, cart_id, product_id, count) values
  (uuid_generate_v4(), (select id from carts where user_id = '68280373-622a-4f24-8752-97905658958c'), uuid_generate_v4(), 20),
  (uuid_generate_v4(), (select id from carts where user_id = '68280373-622a-4f24-8752-97905658958c'), uuid_generate_v4(), 5),
  (uuid_generate_v4(), (select id from carts where user_id = '680abf1b-8dd1-4de6-a922-298e230b125b'), uuid_generate_v4(), 18),
  (uuid_generate_v4(), (select id from carts where user_id = '680abf1b-8dd1-4de6-a922-298e230b125b'), uuid_generate_v4(), 35);