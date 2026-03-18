-- ==========================================
-- Supabase Setup for Preet Dave Portfolio
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create the projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text not null,
  tech_tags text[] default '{}',
  demo_url text,
  repo_url text,
  image_url text,
  is_featured boolean default false,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table projects enable row level security;

-- 3. Public read policy (anyone can read projects)
create policy "Public read" on projects for select using (true);

-- 4. Seed data
insert into projects (title, category, description, tech_tags, repo_url, is_featured, display_order) values
(
  'TalkToNotes',
  'Computer Vision / NLP',
  'OCR system using TrOCR transformer, neural embeddings, chatbot KB integration',
  ARRAY['TrOCR', 'Transformers', 'Computer Vision', 'NLP', 'Vector Search'],
  'https://github.com/iampreetdave/TalkNotes',
  true,
  1
),
(
  'Goal Prediction Model',
  'ML / Predictive Analytics',
  '6-algorithm regression benchmark pipeline, feature engineering, statistical analysis',
  ARRAY['Machine Learning', 'Regression', 'Statistical Modeling', 'Python'],
  null,
  false,
  2
),
(
  'StudBud',
  'Web / AI',
  'Student academic management with ML recommendations, adaptive scheduling',
  ARRAY['Web Development', 'Machine Learning', 'Data Analysis'],
  null,
  false,
  3
),
(
  'Neural Chat System',
  'Network / AI',
  'Real-time socket communication system with AI integration potential',
  ARRAY['Python', 'Socket Programming', 'Network Architecture'],
  null,
  false,
  4
);
