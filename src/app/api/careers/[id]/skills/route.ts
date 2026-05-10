import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data, error } = await supabase
    .from('career_skills')
    .select(`
      display_order,
      skills (
        id,
        name,
        slug,
        description
      )
    `)
    .eq('career_id', id)
    .order('display_order')

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  const skills = data
    .map((row) => ({
      ...row.skills,
      display_order: row.display_order,
    }))
    .filter(Boolean)

  return NextResponse.json(skills)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const skill_id = body?.skill_id

  if (!skill_id || typeof skill_id !== 'string') {
    return NextResponse.json({ error: 'skill_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('career_skills')
    .insert({ career_id: id, skill_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const skill_id = body?.skill_id

  if (!skill_id) return NextResponse.json({ error: 'skill_id is required' }, { status: 400 })

  const { error } = await supabase
    .from('career_skills')
    .delete()
    .eq('career_id', id)
    .eq('skill_id', skill_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}