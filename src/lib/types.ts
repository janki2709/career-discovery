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
  description: string
  category_id: string
  demand_level: 'high' | 'medium' | 'low'
  avg_salary: number
  created_at: string
  updated_at: string
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