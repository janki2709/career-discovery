import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { careerSchema, careerFiltersSchema } from '@/lib/validations'

export async function GET(request: Request) {
  const supabase = await createClient()

  const { searchParams } = new URL(request.url)

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const filters = careerFiltersSchema.safeParse({
    search: searchParams.get('search') ?? undefined,
    category_id: searchParams.get('category_id') ?? undefined,
    demand: searchParams.get('demand') ?? undefined,
    page: searchParams.get('page') ?? 1,
    limit: searchParams.get('limit') ?? 12,
  })

  if (!filters.success) {
    return NextResponse.json(
      { error: filters.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { search, category_id, demand, page, limit } = filters.data

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('careers')
    .select(`
      id,
      title,
      slug,
      short_description,
      full_description,
      junior_salary_range,
      mid_salary_range,
      senior_salary_range,
      demand,
      difficulty_level,
      duration_estimate,
      image_url,
      featured,
      category_id,
      created_at,
      categories (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  if (category_id) {
    query = query.eq('category_id', category_id)
  }

  if (demand) {
    query = query.eq('demand', demand)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  // Fetch saved careers for current user
  let savedCareerIds: string[] = []

  if (user) {
    const { data: savedCareers } = await supabase
      .from('saved_careers')
      .select('career_id')
      .eq('user_id', user.id)

    savedCareerIds =
      savedCareers?.map((item) => item.career_id) ?? []
  }

  // Add is_saved field to each career
  const careersWithSavedState =
    (data ?? []).map((career) => ({
      ...career,
      is_saved: savedCareerIds.includes(career.id),
    }))

  return NextResponse.json({
    data: careersWithSavedState,
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const body = await request.json()

  const parsed = careerSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('careers')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}