import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { searchParams } = new URL(request.url)

    const industry = searchParams.get('industry')
    const category = searchParams.get('category')
    const career = searchParams.get('career')

    /**
     * Fetch industries + categories
     */
    const [industriesRes, categoriesRes] = await Promise.all([
      supabase
        .from('industries')
        .select('id, name, slug')
        .order('name'),

      supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')
    ])

    if (industriesRes.error) {
      throw industriesRes.error
    }

    if (categoriesRes.error) {
      throw categoriesRes.error
    }

    /**
     * Careers dropdown
     */
    let careers: any[] = []

    if (industry) {
      const { data, error } = await supabase
        .from('career_industries')
        .select(`
          careers (
            id,
            title,
            slug
          )
        `)
        .eq('industry_id', industry)

      if (error) {
        throw error
      }

      careers = (data || [])
        .map((item: any) => item.careers)
        .filter(Boolean)
    }

    else if (category) {
      const { data, error } = await supabase
        .from('careers')
        .select(`
          id,
          title,
          slug
        `)
        .eq('category_id', category)
        .order('title')

      if (error) {
        throw error
      }

      careers = data || []
    }

    /**
     * No filter selected
     * Prevent loading all resources
     */
    if (!industry && !category) {
      return NextResponse.json({
        success: true,
        industries: industriesRes.data || [],
        categories: categoriesRes.data || [],
        careers: [],
        resources: []
      })
    }

    /**
     * Determine career ids
     */
    let careerIds: string[] = []

    if (career) {
      careerIds = [career]
    }

    else if (industry) {
      const { data, error } = await supabase
        .from('career_industries')
        .select('career_id')
        .eq('industry_id', industry)

      if (error) {
        throw error
      }

      careerIds = (data || []).map((item) => item.career_id)
    }

    else if (category) {
      const { data, error } = await supabase
        .from('careers')
        .select('id')
        .eq('category_id', category)

      if (error) {
        throw error
      }

      careerIds = (data || []).map((item) => item.id)
    }

    /**
     * Get skill ids from selected careers
     */
    const { data: careerSkills, error: careerSkillsError } = await supabase
      .from('career_skills')
      .select(`
        skill_id,
        career_id,
        careers (
          id,
          title,
          slug
        )
      `)
      .in('career_id', careerIds)

    if (careerSkillsError) {
      throw careerSkillsError
    }

    const skillIds = [...new Set(
      (careerSkills || []).map((item) => item.skill_id)
    )]

    if (skillIds.length === 0) {
      return NextResponse.json({
        success: true,
        industries: industriesRes.data || [],
        categories: categoriesRes.data || [],
        careers,
        resources: []
      })
    }

    /**
     * Fetch resources
     */
    const { data: resources, error: resourcesError } = await supabase
      .from('learning_resources')
      .select(`
        id,
        title,
        url,
        resource_type,
        skill_id,
        created_at,
        skills (
          id,
          name,
          slug
        )
      `)
      .in('skill_id', skillIds)
      .order('created_at', { ascending: false })

    if (resourcesError) {
      throw resourcesError
    }

    /**
     * Attach career info manually
     */
    const enrichedResources = (resources || []).map((resource) => {
      const relatedCareerSkill = (careerSkills || []).find(
        (item) => item.skill_id === resource.skill_id
      )

      return {
        ...resource,
        career: relatedCareerSkill?.careers || null
      }
    })

    return NextResponse.json({
      success: true,
      industries: industriesRes.data || [],
      categories: categoriesRes.data || [],
      careers,
      resources: enrichedResources
    })
  } catch (error) {
    console.error('[COURSES_API_ERROR]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch courses data'
      },
      {
        status: 500
      }
    )
  }
}