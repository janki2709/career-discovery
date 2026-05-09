// src/app/api/progress/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
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

    /**
     * STEP 1
     * Get completed resources for current user
     */
    const {
      data: progressRows,
      error: progressError,
    } = await supabase
      .from('user_resource_progress')
      .select(`
        learning_resource_id,
        learning_resources (
          id,
          skill_id
        )
      `)
      .eq('user_id', user.id)
      .eq('completed', true)

    if (progressError) {
      return NextResponse.json(
        { error: progressError.message },
        { status: 500 }
      )
    }

    /**
     * No progress yet
     */
    if (!progressRows || progressRows.length === 0) {
      return NextResponse.json([])
    }

    /**
     * STEP 2
     * Extract unique skill ids
     */
    const skillIds = Array.from(
      new Set(
        progressRows
          .map(
            (row: any) =>
              row.learning_resources?.skill_id
          )
          .filter(Boolean)
      )
    )

    /**
     * STEP 3
     * Find careers containing those skills
     */
    const {
      data: careerSkills,
      error: careerSkillsError,
    } = await supabase
      .from('career_skills')
      .select(`
        career_id,
        skill_id,
        careers (
          id,
          title,
          slug,
          image_url
        )
      `)
      .in('skill_id', skillIds)

    if (careerSkillsError) {
      return NextResponse.json(
        { error: careerSkillsError.message },
        { status: 500 }
      )
    }

    /**
     * STEP 4
     * Build unique careers map
     */
    const uniqueCareersMap = new Map()

    for (const row of careerSkills ?? []) {
      const career = row.careers as any

      if (!career) continue

      uniqueCareersMap.set(career.id, career)
    }

    const uniqueCareers = Array.from(
      uniqueCareersMap.values()
    )

    /**
     * STEP 5
     * Build completed resource set
     */
    const completedResourceIds = new Set(
      progressRows.map(
        (row: any) => row.learning_resource_id
      )
    )

    /**
     * STEP 6
     * Compute progress for each career
     */
    const result = []

    for (const career of uniqueCareers) {
      const {
        data: careerData,
        error: careerError,
      } = await supabase
        .from('careers')
        .select(`
          id,
          title,
          slug,
          image_url,
          career_skills (
            skills (
              learning_resources (
                id
              )
            )
          )
        `)
        .eq('id', career.id)
        .single()

      if (careerError || !careerData) {
        continue
      }

      /**
       * Flatten all resources
       */
      const allResources =
        careerData.career_skills?.flatMap(
          (cs: any) =>
            cs.skills?.learning_resources ?? []
        ) ?? []

      /**
       * Remove duplicates
       */
      const uniqueResources = Array.from(
        new Map(
          allResources.map((r: any) => [
            r.id,
            r,
          ])
        ).values()
      )

      /**
       * Exclude careers with no resources
       */
      if (uniqueResources.length === 0) {
        continue
      }

      const totalResources =
        uniqueResources.length

      const completedResources =
        uniqueResources.filter((resource: any) =>
          completedResourceIds.has(
            resource.id
          )
        ).length

      /**
       * Exclude untouched careers
       */
      if (completedResources === 0) {
        continue
      }

      const progress = Math.round(
        (completedResources /
          totalResources) *
          100
      )

      result.push({
        id: careerData.id,
        title: careerData.title,
        slug: careerData.slug,
        image_url: careerData.image_url,
        totalResources,
        completedResources,
        progress,
      })
    }

    /**
     * Sort by highest progress
     */
    result.sort(
      (a, b) => b.progress - a.progress
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}