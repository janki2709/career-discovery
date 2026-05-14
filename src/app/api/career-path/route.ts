// src/app/api/career-path/route.ts

import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') || ''
    const industry = searchParams.get('industry') || 'all'
    const category = searchParams.get('category') || 'all'

    const supabase = await createClient()

    let query = supabase
      .from('careers')
      .select(`
        id,
        title,
        slug,
        short_description,
        duration_estimate,
        difficulty_level,
        demand,
        categories (
          id,
          name,
          slug
        ),
        career_industries (
          industry_id
        ),
        career_paths (
          id
        )
      `)

    if (search.trim()) {
      query = query.or(
        `title.ilike.%${search}%,short_description.ilike.%${search}%`
      )
    }

    if (category !== 'all') {
      query = query.eq('categories.slug', category)
    }

    // Filter careers manually by industry_id
    let industryId: string | null = null

    if (industry !== 'all') {
      const { data: matchedIndustry, error: industryError } =
        await supabase
          .from('industries')
          .select('id')
          .eq('slug', industry)
          .single()

      if (industryError) {
        console.error(
          '[INDUSTRY_LOOKUP_ERROR]',
          industryError
        )
      }

      industryId = matchedIndustry?.id || null
    }

    const { data: careers, error } = await query.order('title')

    if (error) {
      console.error('[CAREER_PATHS_API_ERROR]', error)

      return NextResponse.json(
        {
          error: 'Failed to fetch career paths'
        },
        {
          status: 500
        }
      )
    }

    const { data: industries, error: industriesError } =
      await supabase
        .from('industries')
        .select('id, name, slug')
        .order('name')

    if (industriesError) {
      console.error(
        '[INDUSTRIES_FETCH_ERROR]',
        industriesError
      )
    }

    const { data: categories, error: categoriesError } =
      await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')

    if (categoriesError) {
      console.error(
        '[CATEGORIES_FETCH_ERROR]',
        categoriesError
      )
    }

    const industriesMap = new Map(
      (industries || []).map((industry) => [
        industry.id,
        industry
      ])
    )

    let formatted = (careers || []).map((career: any) => {
      const resolvedIndustries =
        career.career_industries
          ?.map((item: any) =>
            industriesMap.get(item.industry_id)
          )
          .filter(Boolean) || []

      return {
        id: career.id,
        title: career.title,
        slug: career.slug,
        short_description: career.short_description,
        duration_estimate: career.duration_estimate,
        difficulty_level: career.difficulty_level,
        demand: career.demand,
        category: career.categories,
        industries: resolvedIndustries,
        total_steps: career.career_paths?.length || 0
      }
    })

    // Manual industry filtering
    if (industryId) {
      formatted = formatted.filter((career) =>
        career.industries.some(
          (item: any) => item.id === industryId
        )
      )
    }

    return NextResponse.json({
      careers: formatted,
      industries: industries || [],
      categories: categories || []
    })
  } catch (error) {
    console.error('[CAREER_PATHS_API_FATAL]', error)

    return NextResponse.json(
      {
        error: 'Internal server error'
      },
      {
        status: 500
      }
    )
  }
}