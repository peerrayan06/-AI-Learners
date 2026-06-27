-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT NOT NULL,
    class_grade TEXT,
    phone TEXT,
    sector_interest TEXT,
    transaction_id TEXT,
    status TEXT DEFAULT 'pending',
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies

-- 1. Allow public read access to profiles for checking duplicates (email, phone, transaction_id)
-- We need a policy to allow inserting during signup
CREATE POLICY "Allow public insert during signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- 2. Allow users to read their own profile
CREATE POLICY "Users can read own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- 3. Allow public read access to check for existing email, phone, or transaction_id during registration
CREATE POLICY "Allow public read for duplicate checks" 
ON public.profiles 
FOR SELECT 
USING (true);

-- 4. Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- If you have an admin role, you might want to add a policy for admins to see all profiles
-- For example, allowing anyone to read for now if the admin page needs it:
-- CREATE POLICY "Allow all read" ON public.profiles FOR SELECT USING (true);
-- CREATE POLICY "Allow all update" ON public.profiles FOR UPDATE USING (true);

-- Enable Realtime for the profiles table
alter publication supabase_realtime add table public.profiles;
