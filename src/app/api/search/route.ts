// src/app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({
      careers: [],
      skills: [],
      industries: [],
      resources: [],
    })
  }

  const supabase = await createClient()

  const [careersRes, skillsRes, industriesRes, resourcesRes] =
    await Promise.all([
      supabase
        .from('careers')
        .select(`
          id,
          title,
          slug,
          short_description
        `)
        .or(
          `title.ilike.%${query}%,short_description.ilike.%${query}%`
        )
        .limit(5),

      supabase
        .from('skills')
        .select(`
          id,
          name,
          slug,
          description
        `)
        .or(
          `name.ilike.%${query}%,description.ilike.%${query}%`
        )
        .limit(5),

      supabase
        .from('industries')
        .select(`
          id,
          name,
          slug,
          description
        `)
        .or(
          `name.ilike.%${query}%,description.ilike.%${query}%`
        )
        .limit(5),

      supabase
        .from('learning_resources')
        .select(`
          id,
          title,
          url,
          resource_type
        `)
        .ilike('title', `%${query}%`)
        .limit(5),
    ])

  return NextResponse.json({
    careers: careersRes.data ?? [],
    skills: skillsRes.data ?? [],
    industries: industriesRes.data ?? [],
    resources: resourcesRes.data ?? [],
  })
}