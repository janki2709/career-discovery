import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Fetch saved careers for current user
const { data, error } = await supabase
  .from('saved_careers')
  .select(`
    id,
    user_id,
    career_id,
    created_at,
    careers (
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
    )
  `)
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  // Get authenticated user
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
  const career_id = body?.career_id

  // Validate input
  if (!career_id || typeof career_id !== 'string') {
    return NextResponse.json(
      { error: 'career_id is required' },
      { status: 400 }
    )
  }

  // Insert saved career
  const { data, error } = await supabase
    .from('saved_careers')
    .insert({
      user_id: user.id,
      career_id,
    })
    .select()
    .single()

  if (error) {
    // Prevent duplicate saves
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Career already saved' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}