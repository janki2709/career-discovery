// src/app/api/career-path/[slug]/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  context: {
    params: Promise<{ slug: string }>
  }
) {
  try {
    const supabase = await createClient()

    const { slug } = await context.params

    console.log(
      `[CAREER_PATH_API_START] slug=${slug}`
    )

    // Step 1: Find career by slug
    const { data: career, error: careerError } =
      await supabase
        .from('careers')
        .select(`
          id,
          title,
          slug,
          short_description,
          image_url
        `)
        .eq('slug', slug)
        .single()

    if (careerError || !career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      )
    }

    // Step 2: Fetch path steps
    const { data: steps, error: pathError } =
      await supabase
        .from('career_paths')
        .select(`
          id,
          career_id,
          step_order,
          stage_type,
          title,
          description,
          duration,
          requirements,
          outcome
        `)
        .eq('career_id', career.id)
        .order('step_order', {
          ascending: true
        })

    if (pathError) {
      console.error(
        '[CAREER_PATH_FETCH_ERROR]',
        pathError
      )

      return NextResponse.json(
        {
          error: 'Failed to fetch career path'
        },
        { status: 500 }
      )
    }

    console.log(
      `[CAREER_PATH_API_SUCCESS] slug=${slug} totalSteps=${steps.length}`
    )

    return NextResponse.json({
      career,
      steps
    })
  } catch (error) {
    console.error(
      '[CAREER_PATH_API_FATAL_ERROR]',
      error
    )

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}