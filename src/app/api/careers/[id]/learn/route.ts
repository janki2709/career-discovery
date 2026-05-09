import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()

    const { id } = await params

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: career, error } = await supabase
      .from('careers')
      .select(`
        *,
        categories (
          id,
          name
        ),
        career_skills (
          display_order,
          skills (
            id,
            name,
            description,
            learning_resources (
              id,
              title,
              resource_type,
              url
            )
          )
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const { data: progress, error: progressError } = await supabase
      .from('user_resource_progress')
      .select(`
        learning_resource_id,
        completed
      `)
      .eq('user_id', user.id)
      .eq('completed', true)

    if (progressError) {
      return NextResponse.json(
        { error: progressError.message },
        { status: 500 }
      )
    }

    const completedResourceIds = new Set(
      progress.map((p) => p.learning_resource_id)
    )

    const skills =
      career.career_skills
        ?.sort(
          (a: any, b: any) =>
            (a.display_order ?? 0) -
            (b.display_order ?? 0)
        )
        .map((cs: any) => {
          const skill = cs.skills

          const resources =
            skill.learning_resources ?? []

          const totalResources = resources.length

          const completedResources =
            resources.filter((resource: any) =>
              completedResourceIds.has(resource.id)
            ).length

          const progressPercentage =
            totalResources === 0
              ? null
              : Math.round(
                  (completedResources /
                    totalResources) *
                    100
                )

          return {
            ...skill,
            resources,
            totalResources,
            completedResources,
            progressPercentage,
          }
        }) ?? []

    const allResources = skills.flatMap(
      (skill: any) => skill.resources
    )

    const totalResources = allResources.length

    const completedResources =
      allResources.filter((resource: any) =>
        completedResourceIds.has(resource.id)
      ).length

    const overallProgress =
      totalResources === 0
        ? 0
        : Math.round(
            (completedResources / totalResources) *
              100
          )

    return NextResponse.json({
      career: {
        id: career.id,
        title: career.title,
        image_url: career.image_url,
      },

      skills,

      progress: {
        completedResources,
        totalResources,
        overallProgress,
      },

      completedResourceIds: Array.from(
        completedResourceIds
      ),
    })
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