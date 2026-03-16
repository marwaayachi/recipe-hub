CREATE POLICY "Users can insert their own recipes"
ON recipes
FOR INSERT
WITH CHECK (user_id = auth.uid());