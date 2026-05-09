import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      console.error(error)

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const supabase = await createClient()

    const payload = {
      title: body.title || null,
      slug: body.slug || null,
      short_description:
        body.short_description || null,
      full_description:
        body.full_description || null,
      junior_salary_range:
        body.junior_salary_range || null,
      mid_salary_range:
        body.mid_salary_range || null,
      senior_salary_range:
        body.senior_salary_range || null,
      demand: body.demand || null,
      difficulty_level:
        body.difficulty_level || null,
      duration_estimate:
        body.duration_estimate || null,
      image_url:
        body.image_url || null,
      featured:
        body.featured === true ||
        body.featured === 'true',
      category_id:
        body.category_id || null,
    }

    const { data, error } = await supabase
      .from('careers')
      .insert(payload)
      .select()
      .single()

    if (error) {
      console.error(error)

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to create career' },
      { status: 500 }
    )
  }
}