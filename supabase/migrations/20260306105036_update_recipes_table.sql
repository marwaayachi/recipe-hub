create type "public"."recipe_category" as enum ('Dessert', 'Vegetarian', 'Quick', 'Vegan', 'Drink');

alter table "public"."recipes" add column "categories" public.recipe_category;

alter table "public"."recipes" add column "image_url" text not null;

alter table "public"."recipes" add column "ingredients" text[];

alter table "public"."recipes" add column "instructions" text[];


