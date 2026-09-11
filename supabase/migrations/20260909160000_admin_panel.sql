-- Migration for Admin Panel feature

-- Add lead tracking fields to admission_enquiries
ALTER TABLE public.admission_enquiries
ADD COLUMN call_status TEXT DEFAULT 'Not Called',
ADD COLUMN interest_status TEXT DEFAULT 'Not Assessed',
ADD COLUMN follow_up_status TEXT DEFAULT 'Not Sent',
ADD COLUMN contact_status TEXT DEFAULT 'Not Contacted',
ADD COLUMN admission_status TEXT DEFAULT 'Not Admitted',
ADD COLUMN source TEXT DEFAULT 'Website Form',
ADD COLUMN is_deleted BOOLEAN DEFAULT false;

-- Create admission_notes table
CREATE TABLE public.admission_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admission_enquiry_id UUID REFERENCES public.admission_enquiries(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT,
    location TEXT,
    description TEXT,
    cover_image TEXT,
    status TEXT DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notices table
CREATE TABLE public.notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    document_url TEXT,
    publish_date DATE,
    status TEXT DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create academic_calendar table
CREATE TABLE public.academic_calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teachers table
CREATE TABLE public.teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT,
    subject TEXT,
    department TEXT,
    photo_url TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    class TEXT,
    academic_year TEXT,
    achievement TEXT,
    exam TEXT,
    rank TEXT,
    percentage TEXT,
    image_url TEXT,
    description TEXT,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_activity_logs table
CREATE TABLE public.admin_activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Enable Row Level Security
ALTER TABLE public.admission_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Add RLS Policies

-- For admission_enquiries
CREATE POLICY "Admins can select enquiries" ON public.admission_enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update enquiries" ON public.admission_enquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete enquiries" ON public.admission_enquiries FOR DELETE TO authenticated USING (true);

-- For admission_notes
CREATE POLICY "Admins can manage notes" ON public.admission_notes FOR ALL TO authenticated USING (true);

-- For events
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published events" ON public.events FOR SELECT TO public USING (status = 'Published');

-- For notices
CREATE POLICY "Admins can manage notices" ON public.notices FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published notices" ON public.notices FOR SELECT TO public USING (status = 'Published');

-- For academic_calendar
CREATE POLICY "Admins can manage calendar" ON public.academic_calendar FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published calendar" ON public.academic_calendar FOR SELECT TO public USING (status = 'Published');

-- For teachers
CREATE POLICY "Admins can manage teachers" ON public.teachers FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published teachers" ON public.teachers FOR SELECT TO public USING (status = 'Published');

-- For achievements
CREATE POLICY "Admins can manage achievements" ON public.achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published achievements" ON public.achievements FOR SELECT TO public USING (status = 'Published');

-- For faqs
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Public can view published faqs" ON public.faqs FOR SELECT TO public USING (status = 'Published');

-- For admin_activity_logs
CREATE POLICY "Admins can manage activity logs" ON public.admin_activity_logs FOR ALL TO authenticated USING (true);
