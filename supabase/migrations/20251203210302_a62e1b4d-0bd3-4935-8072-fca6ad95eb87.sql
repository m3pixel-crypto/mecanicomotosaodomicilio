-- Make the 'dados' bucket private instead of public
UPDATE storage.buckets 
SET public = false 
WHERE id = 'dados';

-- Create storage policies for authenticated users only

-- Policy: Authenticated users can view their own files
CREATE POLICY "Users can view their own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'dados' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy: Authenticated users can upload to their own folder
CREATE POLICY "Users can upload to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dados' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy: Authenticated users can update their own files
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'dados' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy: Authenticated users can delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'dados' AND auth.uid()::text = (storage.foldername(name))[1]);