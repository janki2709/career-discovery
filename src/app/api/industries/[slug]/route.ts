// src/app/api/industries/[slug]/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const filtersSchema = z.object({
  search: z.string().optional(),
  demand: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = await createClient()
  const { slug } = await params

  const { searchParams } = new URL(request.url)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Parse filters
  const filters = filtersSchema.safeParse({
    search: searchParams.get('search') ?? undefined,
    demand: searchParams.get('demand') ?? undefined,
    page: searchParams.get('page') ?? 1,
    limit: searchParams.get('limit') ?? 9,
  })

  if (!filters.success) {
    return NextResponse.json(
      { error: filters.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { search, demand, page, limit } = filters.data
  const from = (page - 1) * limit
  const to = from + limit - 1

  // Step 1: Get the industry by slug
  const { data: industry, error: industryError } = await supabase
    .from('industries')
    .select('id, name, slug, description, icon')
    .eq('slug', slug)
    .single()

  if (industryError || !industry) {
    return NextResponse.json(
      { error: 'Industry not found' },
      { status: 404 }
    )
  }

  // Step 2: Get all career IDs for this industry
  const { data: careerIndustries, error: junctionError } = await supabase
    .from('career_industries')
    .select('career_id')
    .eq('industry_id', industry.id)

  if (junctionError) {
    return NextResponse.json(
      { error: junctionError.message },
      { status: 500 }
    )
  }

  const careerIds = (careerIndustries ?? []).map((ci) => ci.career_id)

  if (careerIds.length === 0) {
    return NextResponse.json({
      industry,
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    })
  }

  // Step 3: Query careers with filters and pagination
  let query = supabase
    .from('careers')
    .select(`
      id,
      title,
      slug,
      short_description,
      demand,
      difficulty_level,
      junior_salary_range,
      mid_salary_range,
      senior_salary_range,
      image_url,
      featured,
      created_at,
      categories (
        id,
        name
      )
    `, { count: 'exact' })
    .in('id', careerIds)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  if (demand) {
    query = query.eq('demand', demand)
  }

  const { data: careers, error: careersError, count } = await query

  if (careersError) {
    return NextResponse.json(
      { error: careersError.message },
      { status: 500 }
    )
  }

  // Step 4: Add is_saved for authenticated users
  let savedCareerIds: string[] = []

  if (user) {
    const { data: savedCareers } = await supabase
      .from('saved_careers')
      .select('career_id')
      .eq('user_id', user.id)

    savedCareerIds = savedCareers?.map((item) => item.career_id) ?? []
  }

  const careersWithSavedState = (careers ?? []).map((career) => ({
    ...career,
    is_saved: savedCareerIds.includes(career.id),
  }))

  return NextResponse.json({
    industry,
    data: careersWithSavedState,
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
}