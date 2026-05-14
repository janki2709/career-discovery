// src/app/api/industries/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  console.log(
  'SUPABASE URL:',
  process.env.NEXT_PUBLIC_SUPABASE_URL
)

  const { data, error } = await supabase
    .from('industries')
    .select(`
      id,
      name,
      slug,
      description,
      icon,
      created_at,
      career_industries (
        career_id
      )
    `)
    .order('name', { ascending: true })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  const industries = (data ?? []).map((industry) => ({
    id: industry.id,
    name: industry.name,
    slug: industry.slug,
    description: industry.description,
    icon: industry.icon,
    created_at: industry.created_at,
    career_count: industry.career_industries?.length ?? 0,
  }))

  return NextResponse.json({ data: industries })
}