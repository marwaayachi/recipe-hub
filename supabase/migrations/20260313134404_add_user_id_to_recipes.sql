-- Step 1: Add the column
ALTER TABLE recipes
ADD COLUMN user_id uuid;

-- Step 2: Add the foreign key constraint
ALTER TABLE recipes
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id);