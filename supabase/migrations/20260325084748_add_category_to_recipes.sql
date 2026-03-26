
alter table recipes
add column category_id bigint;

alter table recipes
add constraint fk_category
foreign key (category_id)
references categories(id)
on delete set null