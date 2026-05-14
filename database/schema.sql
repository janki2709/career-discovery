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

create table public.industries (
  id uuid not null default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text null,
  icon text null,
  created_at timestamp without time zone null default now(),
  constraint industries_pkey primary key (id),
  constraint industries_name_key unique (name),
  constraint industries_slug_key unique (slug)
) TABLESPACE pg_default;


create table public.career_industries (
  career_id uuid not null,
  industry_id uuid not null,
  constraint career_industries_pkey primary key (career_id, industry_id),
  constraint career_industries_career_id_fkey foreign key (career_id)
    references careers (id) on delete cascade,
  constraint career_industries_industry_id_fkey foreign key (industry_id)
    references industries (id) on delete cascade
) TABLESPACE pg_default;

create table public.career_paths (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null references public.careers(id) on delete cascade,
  step_order integer not null,
  stage_type text not null,
  title text not null,
  description text,
  duration text,
  requirements text,
  outcome text,
  optional boolean not null default false,
  created_at timestamp with time zone not null default now()
);

create index idx_career_paths_career_id
on public.career_paths(career_id);

create index idx_career_paths_step_order
on public.career_paths(career_id, step_order);


create table public.bookmarked_resources (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  resource_id uuid not null,
  created_at timestamp without time zone null default now(),

  constraint bookmarked_resources_pkey
    primary key (id),

  constraint bookmarked_resources_user_id_resource_id_key
    unique (user_id, resource_id),

  constraint bookmarked_resources_user_id_fkey
    foreign key (user_id)
    references profiles (id)
    on delete cascade,

  constraint bookmarked_resources_resource_id_fkey
    foreign key (resource_id)
    references learning_resources (id)
    on delete cascade
) TABLESPACE pg_default;


-- =====================================================
--      INDEXES FOR FAST SEARCH FUNCTIONALITY
-- =====================================================


create index if not exists careers_title_idx
on careers using gin (title gin_trgm_ops);

create index if not exists careers_description_idx
on careers using gin (short_description gin_trgm_ops);

create index if not exists skills_name_idx
on skills using gin (name gin_trgm_ops);

create index if not exists industries_name_idx
on industries using gin (name gin_trgm_ops);

create index if not exists learning_resources_title_idx
on learning_resources using gin (title gin_trgm_ops);