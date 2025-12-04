CREATE POLICY "Users can delete own profile"
ON profiles FOR DELETE
USING (auth.uid() = user_id);