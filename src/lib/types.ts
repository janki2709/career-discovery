// src/lib/types.ts

// ─── Database entity types ───────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  created_at: string
}

export interface Skill {
  id: string
  name: string
  demand_percentage: number
  created_at: string
}

export interface Career {
  id: string

  title: string
  slug: string

  short_description: string
  full_description: string

  junior_salary_range: string
  mid_salary_range: string
  senior_salary_range: string

  demand: 'High' | 'Medium' | 'Low'

  difficulty_level:
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'

  duration_estimate: string

  image_url: string | null

  featured: boolean

  category_id: string

  created_at: string
}

export interface CareerSkill {
  career_id: string
  skill_id: string
}

export interface SavedCareer {
  id: string
  user_id: string
  career_id: string
  created_at: string
}

export interface UserSkillProgress {
  id: string
  user_id: string
  career_path_name: string
  progress_percentage: number
  created_at: string
  updated_at: string
}

// ─── Joined / enriched types (what API routes return) ────────────────────────

export interface CareerWithCategory extends Career {
  categories: Pick<Category, 'id' | 'name'> | null
}

export interface CareerWithDetails extends Career {
  categories: Pick<Category, 'id' | 'name'> | null
  skills: Skill[]
  is_saved?: boolean
}

export interface SavedCareerWithDetails extends SavedCareer {
  careers: CareerWithCategory | null
}

// ─── API response shapes ─────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  error: string
}

// ─── Filter / query param types ───────────────────────────────────────────────

export interface CareerFilters {
  search?: string
  category_id?: string
  demand_level?: 'high' | 'medium' | 'low' | ''
  page?: number
  limit?: number
}

export interface CareerPathStep {
  id: string
  career_id: string

  step_order: number

  stage_type:
    | 'education'
    | 'skill'
    | 'project'
    | 'internship'
    | 'job'
    | 'senior_role'

  title: string
  description: string
  duration: string
  requirements: string
  outcome: string
}

export interface CareerPathResponse {
  career: Career
  steps: CareerPathStep[]
}