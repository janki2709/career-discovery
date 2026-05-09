import { z } from 'zod'

// ─── Category ─────────────────────────────────────────────────────────────────

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

// ─── Skill ────────────────────────────────────────────────────────────────────

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),
  demand_percentage: z
    .number({error: 'Must be a number',})
    .int('Must be a whole number')
    .min(0, 'Must be at least 0')
    .max(100, 'Must be at most 100'),
})

export type SkillFormData = z.infer<typeof skillSchema>

// ─── Career ───────────────────────────────────────────────────────────────────

export const careerSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(150, 'Title must be under 150 characters')
    .trim(),

  slug: z
    .string()
    .min(2)
    .max(150)
    .trim(),

  short_description: z
    .string()
    .min(20, 'Short description must be at least 20 characters')
    .max(500, 'Short description too long')
    .trim(),

  full_description: z
    .string()
    .min(20, 'Full description must be at least 20 characters')
    .max(5000, 'Full description too long')
    .trim(),

  junior_salary_range: z.string().trim(),
  mid_salary_range: z.string().trim(),
  senior_salary_range: z.string().trim(),

  demand: z.enum(['High', 'Medium', 'Low']),

  difficulty_level: z.enum(['Beginner', 'Intermediate', 'Advanced']),

  duration_estimate: z.string().trim(),

  image_url: z.string().url().optional().or(z.literal('')),

  featured: z.boolean(),

  category_id: z.string().uuid('Invalid category'),
})

// ─── Search / filter params ───────────────────────────────────────────────────

export const careerFiltersSchema = z.object({
  search: z.string().trim().optional(),
  category_id: z.string().uuid().optional(),
  demand: z.enum(['High', 'Medium', 'Low']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
})