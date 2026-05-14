import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DashboardHero } from './components/dashboard-hero'
import { CategorySection } from './components/category-section'
import { PopularCareersSection } from './components/popular-careers-section'
import { PopularCareerCard } from './components/popular-career-card'

function formatSalary(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const getCachedStaticData = unstable_cache(
  async () => {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Categories
    const { data: categories } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        careers(count)
      `)
      .limit(6)

    // Popular career ids
    const { data: popularCareerIds } = await supabase
      .from('popular_careers')
      .select('career_id')
      .limit(5)

    const careerIds =
      popularCareerIds?.map((item) => item.career_id) ?? []

    // Popular careers
    const { data: popularCareers } = await supabase
      .from('careers')
      .select(`
        id,
        title,
        slug,
        short_description,
        image_url,
        demand,
        junior_salary_range,
        mid_salary_range,
        senior_salary_range,
        categories(name)
      `)
      .in('id', careerIds)

    // Top skills ids
    const { data: topSkillIds } = await supabase
      .from('top_skills_in_demand')
      .select('skill_id')
      .limit(3)

    const skillIds =
      topSkillIds?.map((item) => item.skill_id) ?? []

    // Top skills
    const { data: topSkills } = await supabase
      .from('skills')
      .select(`
        id,
        name
      `)
      .in('id', skillIds)

    return {
      categories,
      popularCareers,
      topSkills,
    }
  },
  ['dashboard-static-data'],
  { revalidate: 3600 }
)

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  /**
   * CONTINUE YOUR JOURNEY
   * New calculation logic
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

  let continueJourney: any[] = []

  if (!progressError && progressRows?.length) {
    /**
     * Completed resources set
     */
    const completedResourceIds = new Set(
      progressRows.map(
        (row: any) => row.learning_resource_id
      )
    )

    /**
     * Unique skills
     */
    const skillsMap = new Map()

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

    const {
      data: skillsData,
    } = await supabase
      .from('skills')
      .select('id, name')
      .in('id', skillIds)

    const uniqueSkills = skillsData ?? []

    /**
     * Calculate progress per skill
     */
    for (const skill of uniqueSkills) {
      const {
        data: skillResources,
        error: skillResourcesError,
      } = await supabase
        .from('learning_resources')
        .select('id')
        .eq('skill_id', skill.id)

      if (
        skillResourcesError ||
        !skillResources ||
        skillResources.length === 0
      ) {
        continue
      }

      /**
       * Remove duplicates
       */
      const uniqueResources = Array.from(
        new Map(
          skillResources.map((r: any) => [
            r.id,
            r,
          ])
        ).values()
      )

      const totalResources =
        uniqueResources.length

      const completedResources =
        uniqueResources.filter((resource: any) =>
          completedResourceIds.has(
            resource.id
          )
        ).length

      const progress_percentage = Math.round(
        (completedResources /
          totalResources) *
          100
      )

      /**
       * Only show in-progress skills
       */
      if (
        progress_percentage > 0 &&
        progress_percentage < 100
      ) {
        continueJourney.push({
          skill_id: skill.id,
          skill_name: skill.name,
          progress_percentage,
        })
      }
    }

    /**
     * Highest progress first
     */
    continueJourney.sort(
      (a, b) =>
        b.progress_percentage -
        a.progress_percentage
    )
  }

const [
  {
    categories,
    popularCareers,
    topSkills,
  },
] = await Promise.all([
  getCachedStaticData(),
])

/**
 * TOP SKILLS IN DEMAND
 */
const {
  data: topSkillsDemand,
  error: topSkillsDemandError,
} = await supabase
  .from('top_skills_in_demand')
  .select(`
    skill_id,
    skill_name
  `)

let topSkillsProgress: any[] = []

if (
  !topSkillsDemandError &&
  topSkillsDemand?.length
) {
  /**
   * Completed resources
   */
  const {
    data: completedRows,
  } = await supabase
    .from('user_resource_progress')
    .select(`
      learning_resource_id
    `)
    .eq('user_id', user.id)
    .eq('completed', true)

  const completedResourceIds = new Set(
    (completedRows ?? []).map(
      (row: any) => row.learning_resource_id
    )
  )

  /**
   * Calculate percentage for each skill
   */
  for (const skill of topSkillsDemand) {
    const {
      data: skillResources,
      error: skillResourcesError,
    } = await supabase
      .from('learning_resources')
      .select('id')
      .eq('skill_id', skill.skill_id)

    if (
      skillResourcesError ||
      !skillResources ||
      skillResources.length === 0
    ) {
      continue
    }

    /**
     * Remove duplicates
     */
    const uniqueResources = Array.from(
      new Map(
        skillResources.map((r: any) => [
          r.id,
          r,
        ])
      ).values()
    )

    const totalResources =
      uniqueResources.length

    const completedResources =
      uniqueResources.filter((resource: any) =>
        completedResourceIds.has(
          resource.id
        )
      ).length

    const completion_percentage =
      Math.round(
        (completedResources /
          totalResources) *
          100
      )

    topSkillsProgress.push({
      skill_id: skill.skill_id,
      skill_name: skill.skill_name,
      completion_percentage,
    })
  }

  /**
   * Highest percentage first
   */
  topSkillsProgress.sort(
    (a, b) =>
      b.completion_percentage -
      a.completion_percentage
  )
}

  return (
    <div className="flex gap-6">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-6">

        <DashboardHero />

        <CategorySection categories={categories ?? []} />

        {/* POPULAR CAREERS + SIDEBAR */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">

          <PopularCareersSection careers={popularCareers ?? []} />

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Continue Your Journey */}
            <Card className="rounded-2xl border border-slate-200 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  Continue Your Journey
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {(continueJourney ?? []).map((item: any) => (
                  <div key={item.skill_id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                          <BookOpen className="h-5 w-5 text-violet-600" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.skill_name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.progress_percentage}% Complete
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {item.progress_percentage}%
                      </span>
                    </div>

                    <Progress
                      value={item.progress_percentage}
                      className="h-2"
                    />
                  </div>
                ))}

                <Link
                  href="/skills"
                  className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                  View all progress
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Top Skills in Demand */}


<Card className="rounded-2xl border border-slate-200 shadow-none">
  <CardHeader className="pb-4">
    <CardTitle className="text-base font-semibold">
      Top Skills in Demand
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-5">
    {(topSkillsProgress ?? []).map(
      (skill: any, index: number) => (
        <div
          key={skill.skill_id}
          className="flex items-center gap-3"
        >
          <span className="w-4 text-sm font-semibold text-violet-600">
            {index + 1}
          </span>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">
                {skill.skill_name}
              </span>

              <span className="text-xs font-medium text-slate-500">
                {skill.completion_percentage}%
              </span>
            </div>

            <Progress
              value={skill.completion_percentage}
              className="h-2"
            />
          </div>
        </div>
      )
    )}

    <Link
      href="/skills"
      className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
    >
      View all skills
      <ArrowRight className="h-4 w-4" />
    </Link>
  </CardContent>
</Card>


          </div>
        </div>
      </div>
    </div>
  )
}