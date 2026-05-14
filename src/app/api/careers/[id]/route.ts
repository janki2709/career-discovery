// src/app/api/careers/[id]/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { careerSchema } from '@/lib/validations'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('API HIT')

    const supabase = await createClient()

    const { id } = await params

    console.log('career id:', id)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    console.log('user:', user)
    console.log('userError:', userError)

const { data: career, error } = await supabase
  .from('careers')
  .select(`
    *,
    categories(
      id,
      name
    ),
    career_skills(
      display_order,
      skills(
        id,
        name
      )
    )
  `)
  .eq('id', id)
  .single()

if (career?.career_skills) {
  career.career_skills.sort(
    (a: any, b: any) =>
      (a.display_order ?? 0) - (b.display_order ?? 0)
  )
}

    console.log('career query result:', career)
    console.log('career query error:', error)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    let is_saved = false

    if (user) {
      const { data: saved, error: savedError } = await supabase
        .from('saved_careers')
        .select('id')
        .eq('user_id', user.id)
        .eq('career_id', id)
        .maybeSingle()

      console.log('saved result:', saved)
      console.log('saved error:', savedError)

      is_saved = !!saved
    }

    return NextResponse.json({
      ...career,
      is_saved,
    })
  } catch (err) {
    console.error('FULL API ERROR:')
    console.error(err)

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = careerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('careers')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, categories(id, name)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase.from('careers').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}