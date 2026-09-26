-- ContinuEd PostgreSQL & Supabase Schema
-- "Your Learning, Always in Continuity."

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Profile (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  avatar_url TEXT,
  department TEXT DEFAULT 'Computer Science & Engineering',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subjects
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  color_theme TEXT DEFAULT '#4F46E5',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Classes (Individual lecture sessions taught by professors)
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  class_date DATE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  description TEXT,
  important_points TEXT[],
  prerequisites TEXT[],
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Resources (Slides, PDFs, recordings attached to classes)
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'pptx', 'doc', 'image', 'video', 'link')),
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Assignments
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  max_points INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Enrollments
CREATE TABLE IF NOT EXISTS public.student_classes (
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (student_id, subject_id)
);

-- 7. Missed Classes (Academic continuity recovery center)
CREATE TABLE IF NOT EXISTS public.missed_classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  missed_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'needs_catchup' CHECK (status IN ('needs_catchup', 'in_progress', 'completed')),
  catchup_started_at TIMESTAMPTZ,
  catchup_completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, class_id)
);

-- 8. AI Catch-Up Plans (Generated via Nebius AI API)
CREATE TABLE IF NOT EXISTS public.catchup_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  missed_class_id UUID REFERENCES public.missed_classes(id) ON DELETE CASCADE,
  ai_summary TEXT NOT NULL,
  key_concepts JSONB NOT NULL, -- [{title, description, importance}]
  steps JSONB NOT NULL,        -- [{stepNumber, title, durationMinutes, isCompleted, type}]
  what_to_know_first TEXT[],
  practice_questions JSONB,
  estimated_time_minutes INTEGER DEFAULT 40,
  completed_steps INTEGER DEFAULT 0,
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Quiz Questions (Generated dynamically from lecture concepts)
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["Option A", "Option B", "Option C", "Option D"]
  correct_option_index INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium'
);

-- 10. Quiz Results (Student performance on recovery quizzes)
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers_submitted JSONB,
  passed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'alert', 'success', 'warning')),
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) setup examples:
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missed_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catchup_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Students can view and manage their missed classes"
ON public.missed_classes FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view missed classes for their subjects"
ON public.missed_classes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.classes c
    JOIN public.subjects s ON c.subject_id = s.id
    WHERE c.id = missed_classes.class_id AND s.teacher_id = auth.uid()
  )
);
