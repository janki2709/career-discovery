create table public.career_skills (
  career_id uuid not null,
  skill_id uuid not null,
  display_order integer not null,
  constraint career_skills_pkey primary key (career_id, skill_id),
  constraint career_skills_career_id_fkey foreign KEY (career_id) references careers (id) on delete CASCADE,
  constraint career_skills_skill_id_fkey foreign KEY (skill_id) references skills (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.careers (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  short_description text not null,
  full_description text not null,
  junior_salary_range text null,
  mid_salary_range text null,
  senior_salary_range text null,
  demand public.demand_level not null,
  difficulty_level public.difficulty_level not null,
  duration_estimate text null,
  image_url text null,
  featured boolean null default false,
  category_id uuid null,
  created_at timestamp without time zone null default now(),
  constraint careers_pkey primary key (id),
  constraint careers_slug_key unique (slug),
  constraint careers_category_id_fkey foreign KEY (category_id) references categories (id) on delete set null
) TABLESPACE pg_default;


create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  description text null,
  icon text null,
  created_at timestamp without time zone null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_name_key unique (name),
  constraint categories_slug_key unique (slug)
) TABLESPACE pg_default;


create table public.learning_resources (
  id uuid not null default gen_random_uuid (),
  skill_id uuid null,
  title text not null,
  resource_type public.resource_type not null,
  url text not null,
  created_at timestamp without time zone null default now(),
  constraint learning_resources_pkey primary key (id),
  constraint learning_resources_skill_id_fkey foreign KEY (skill_id) references skills (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.learning_resources (
  id uuid not null default gen_random_uuid (),
  skill_id uuid null,
  title text not null,
  resource_type public.resource_type not null,
  url text not null,
  created_at timestamp without time zone null default now(),
  constraint learning_resources_pkey primary key (id),
  constraint learning_resources_skill_id_fkey foreign KEY (skill_id) references skills (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.profiles (
  id uuid not null,
  full_name text not null,
  email text not null,
  grade_level text not null,
  education_stream text null,
  school_or_college_name text null,
  city text null,
  created_at timestamp without time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.saved_careers (
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  career_id uuid null,
  created_at timestamp without time zone null default now(),
  constraint saved_careers_pkey primary key (id),
  constraint saved_careers_user_id_career_id_key unique (user_id, career_id),
  constraint saved_careers_career_id_fkey foreign KEY (career_id) references careers (id) on delete CASCADE,
  constraint saved_careers_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.skills (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  description text null,
  created_at timestamp without time zone null default now(),
  constraint skills_pkey primary key (id),
  constraint skills_name_key unique (name),
  constraint skills_slug_key unique (slug)
) TABLESPACE pg_default;