import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { skillSchema } from '@/lib/validations'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')?.trim()

  let query = supabase
    .from('skills')
    .select(`
      id,
      name,
      slug,
      description,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = skillSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('skills')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}