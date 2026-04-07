-- Enable Row Level Security on recipes table
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own recipes
CREATE POLICY "Users can read their own recipes"
ON recipes
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Policy: Users can update their own recipes
CREATE POLICY "Users can update their own recipes"
ON recipes
FOR UPDATE
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Policy: Users can delete their own recipes
CREATE POLICY "Users can delete their own recipes"
ON recipes
FOR DELETE
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Allow users to insert their own recipes
CREATE POLICY "Users can insert their own recipes"
ON recipes
FOR INSERT
WITH CHECK (auth.uid() = user_id);


