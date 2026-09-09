-- Migration: Real-Time CMS & Content Management System Tables for Shandilya Public School (SPS)

-- 1. Site Settings (Global branding, contact info, admission open toggle)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id text PRIMARY KEY DEFAULT 'global',
  school_name text NOT NULL DEFAULT 'Shandilya Public School',
  short_name text NOT NULL DEFAULT 'Shandilya',
  motto text NOT NULL DEFAULT 'Listen, Learn & Strive to Shine',
  affiliation_text text NOT NULL DEFAULT 'CBSE Affiliated (Pre-Primary to Class XII)',
  email text NOT NULL DEFAULT 'shandilyaps@rediffmail.com',
  phones text[] NOT NULL DEFAULT ARRAY['8765261262', '9336416244'],
  whatsapp text NOT NULL DEFAULT '918765261262',
  address_line1 text NOT NULL DEFAULT 'Gayatri Nagar Colony, Garhwaghat Road',
  address_line2 text NOT NULL DEFAULT 'Samne Ghat, Lanka',
  city text NOT NULL DEFAULT 'Varanasi',
  state text NOT NULL DEFAULT 'Uttar Pradesh',
  pincode text NOT NULL DEFAULT '221005',
  admissions_open boolean NOT NULL DEFAULT true,
  admission_banner_text text NOT NULL DEFAULT 'Admissions Open for 2026–27 (Pre-Primary to Class XII) — Enquire Now',
  facebook_url text DEFAULT '',
  instagram_url text DEFAULT '',
  youtube_url text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Page Sections (Dynamic JSON content for Hero, Welcome, Facilities, Why Choose Us, FAQs, Testimonials, etc.)
CREATE TABLE IF NOT EXISTS public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL, -- e.g. 'home', 'about', 'contact'
  section_key text NOT NULL, -- e.g. 'hero', 'welcome', 'why_us', 'facilities', 'faq', 'testimonials'
  title text,
  eyebrow text,
  subtitle text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_visible boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page_key, section_key)
);

-- 3. Teachers & Faculty
CREATE TABLE IF NOT EXISTS public.teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  qualification text,
  experience text,
  bio text,
  image_url text,
  email text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Achievements & Awards
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Academic', -- 'Academic', 'Sports', 'Cultural', 'Olympiad', 'School'
  year text NOT NULL DEFAULT '2025-26',
  badge text,
  description text NOT NULL,
  image_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Fee Structure Tiers
CREATE TABLE IF NOT EXISTS public.fee_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL, -- 'Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Senior Secondary'
  class_name text NOT NULL, -- 'Pre-Nursery to UKG', 'Class I – V', etc.
  admission_fee text NOT NULL,
  tuition_fee text NOT NULL,
  annual_charges text NOT NULL,
  term_details text,
  notes text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 6. Notices, Circulars & Announcements
CREATE TABLE IF NOT EXISTS public.notices_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Notice', -- 'Notice', 'Circular', 'Event', 'Exam', 'Holiday'
  publish_date date NOT NULL DEFAULT CURRENT_DATE,
  description text NOT NULL,
  file_url text,
  link_url text,
  is_pinned boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices_events ENABLE ROW LEVEL SECURITY;

-- Read policies (Public / Anon can view everything on the website)
CREATE POLICY "Public can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view page_sections" ON public.page_sections FOR SELECT USING (true);
CREATE POLICY "Public can view teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public can view fee_tiers" ON public.fee_tiers FOR SELECT USING (true);
CREATE POLICY "Public can view notices_events" ON public.notices_events FOR SELECT USING (true);

-- Admin modification policies (Authenticated admins can insert, update, delete)
CREATE POLICY "Admins can update site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage page_sections" ON public.page_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage teachers" ON public.teachers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage fee_tiers" ON public.fee_tiers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage notices_events" ON public.notices_events FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enable Realtime for all CMS tables so changes push instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_sections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.teachers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.achievements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fee_tiers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notices_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admission_enquiries;
