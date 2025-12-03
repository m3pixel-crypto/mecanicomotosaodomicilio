-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create motorcycles table
CREATE TABLE public.motorcycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  plate TEXT NOT NULL,
  current_km INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_history table
CREATE TABLE public.service_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  motorcycle_id UUID NOT NULL REFERENCES public.motorcycles(id) ON DELETE CASCADE,
  service_date DATE NOT NULL,
  service_description TEXT NOT NULL,
  km_at_service INTEGER NOT NULL,
  source TEXT NOT NULL DEFAULT 'cliente' CHECK (source IN ('oficina', 'cliente')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Motorcycles policies
CREATE POLICY "Users can view own motorcycles" ON public.motorcycles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own motorcycles" ON public.motorcycles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own motorcycles" ON public.motorcycles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own motorcycles" ON public.motorcycles
  FOR DELETE USING (auth.uid() = user_id);

-- Service history policies (access through motorcycle ownership)
CREATE POLICY "Users can view service history of own motorcycles" ON public.service_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.motorcycles 
      WHERE motorcycles.id = service_history.motorcycle_id 
      AND motorcycles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert service history for own motorcycles" ON public.service_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.motorcycles 
      WHERE motorcycles.id = service_history.motorcycle_id 
      AND motorcycles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete service history of own motorcycles" ON public.service_history
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.motorcycles 
      WHERE motorcycles.id = service_history.motorcycle_id 
      AND motorcycles.user_id = auth.uid()
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_motorcycles_updated_at
  BEFORE UPDATE ON public.motorcycles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'name', new.email));
  RETURN new;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();