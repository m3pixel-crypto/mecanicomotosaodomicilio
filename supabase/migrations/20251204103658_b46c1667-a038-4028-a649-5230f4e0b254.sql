CREATE POLICY "Users can update service history of own motorcycles"
ON service_history FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM motorcycles
  WHERE motorcycles.id = service_history.motorcycle_id
  AND motorcycles.user_id = auth.uid()
));