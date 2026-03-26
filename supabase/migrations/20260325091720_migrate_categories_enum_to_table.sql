
INSERT INTO categories (name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Dessert'),
('Vegan'),
('Quick'),
('Drink');

-- Migrate data 
update recipes r
set category_id = c.id
from categories c
where r.categories::text = c.name;

-- Drop old column
alter table recipes drop column categories;

-- Drop enum
drop type recipe_category;