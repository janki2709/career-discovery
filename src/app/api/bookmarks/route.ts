// src/app/api/bookmarks/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
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

const { data, error } = await supabase
  .from('bookmarked_resources')
  .select(`
    id,
    user_id,
    resource_id,
    created_at,
    learning_resources (
      id,
      skill_id,
      title,
      resource_type,
      url,
      created_at
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

  const resource_id = body?.resource_id

  if (!resource_id || typeof resource_id !== 'string') {
    return NextResponse.json(
      { error: 'resource_id is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('bookmarked_resources')
    .insert({
      user_id: user.id,
      resource_id,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Resource already bookmarked' },
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