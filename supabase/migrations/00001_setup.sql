-- 1. Create project_inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  services text[] DEFAULT '{}'::text[],
  budget text,
  timeline text,
  message text NOT NULL
);

-- 2. Create portfolio_projects table for CMS
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  index text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  year text NOT NULL,
  description text NOT NULL,
  services text[] DEFAULT '{}'::text[],
  image text NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Policies
-- Allow anyone (anon) to insert inquiries (for the contact form)
CREATE POLICY "Allow public insert to project_inquiries"
  ON public.project_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone (anon) to read portfolio projects
CREATE POLICY "Allow public read of portfolio_projects"
  ON public.portfolio_projects
  FOR SELECT
  TO anon
  USING (true);

-- 5. Seed Initial Portfolio Data
INSERT INTO public.portfolio_projects (index, name, category, year, description, services, image)
VALUES
  ('01', 'Ledgerline', 'Fintech / Product', '2025', 'A payments dashboard for a small fintech team who were losing customers at onboarding. We rebuilt the flow around one question: what does this person need to see right now?', ARRAY['Product design', 'Design system', 'Frontend'], 'work-1.png'),
  ('02', 'Aurel Atelier', 'Fashion / Brand & Web', '2025', 'Brand system and commerce site for a made-to-order label. Quiet typography, heavy imagery, and a checkout that gets out of the way.', ARRAY['Brand system', 'Art direction', 'E-commerce'], 'work-2.png'),
  ('03', 'Northbeam', 'SaaS / Marketing', '2024', 'A marketing site and docs experience for an analytics platform. We cut the page count in half and the demo requests went the other way.', ARRAY['Positioning', 'Web design', 'Development'], 'work-3.png'),
  ('04', 'Orbit Collective', 'Creator platform / Product', '2024', 'Identity and interface for a membership platform used by independent writers. Built to feel personal at ten members and at ten thousand.', ARRAY['Identity', 'UI/UX', 'Motion'], 'work-4.png');

-- 6. Setup Storage Bucket for Assets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true);

-- Storage Policy: Allow anyone to read images from the bucket
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'portfolio-media' );
