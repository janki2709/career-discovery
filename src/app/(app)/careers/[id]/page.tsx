// src/app/careers/[id]/page.tsx

import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SaveCareerButton } from '@/components/save-career-button'
import { headers } from 'next/headers'

import {
  ArrowLeft,
  Pencil,
  DollarSign,
  TrendingUp,
  Clock,
} from 'lucide-react'

import { BookOpen } from 'lucide-react'

const DEMAND_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-blue-100 text-blue-700 border-blue-200',
  intermediate: 'bg-orange-100 text-orange-700 border-orange-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

const headersList = await headers()

const host = headersList.get('host')

const protocol =
  process.env.NODE_ENV === 'development'
    ? 'http'
    : 'https'

const res = await fetch(
  `${protocol}://${host}/api/careers/${id}`,
  {
    cache: 'no-store',
  }
)

  if (!res.ok) {
    notFound()
  }

const text = await res.text()

console.log('RAW RESPONSE:')
console.log(text)

const career = JSON.parse(text)

  const demandKey = career.demand?.toLowerCase() ?? ''
  const difficultyKey = career.difficulty_level?.toLowerCase() ?? ''

  const skills = (career.career_skills ?? [])
    .map((cs: any) => cs.skills)
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="text-slate-500">
          <Link href="/careers">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Careers
          </Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden border bg-white">
        <div className="h-56 bg-gradient-to-br from-violet-100 to-indigo-100 relative">
          {career.image_url && (
            <img
              src={career.image_url}
              alt={career.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-6 space-y-4">
<div className="flex items-start justify-between gap-4">
  <div>
    <p className="text-xs text-violet-600 font-medium mb-1">
      {career.categories?.name ?? ''}
    </p>

    <h1 className="text-2xl font-bold text-slate-800">
      {career.title}
    </h1>
  </div>

  <div className="flex items-center gap-2">
    <Button asChild>
      <Link href={`/careers/${career.id}/learn`}>
        <BookOpen className="h-4 w-4 mr-2" />
        Start Learning
      </Link>
    </Button>

    <SaveCareerButton
      careerId={career.id}
      initialSaved={career.is_saved}
    />
  </div>
</div>

          <div className="flex flex-wrap gap-2">
            {demandKey && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium border ${
                  DEMAND_BADGE[demandKey] ?? ''
                }`}
              >
                {demandKey.charAt(0).toUpperCase() + demandKey.slice(1)} Demand
              </span>
            )}

            {difficultyKey && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium border ${
                  DIFFICULTY_BADGE[difficultyKey] ?? ''
                }`}
              >
                {difficultyKey.charAt(0).toUpperCase() +
                  difficultyKey.slice(1)}
              </span>
            )}

            {career.duration_estimate && (
              <span className="text-xs px-3 py-1 rounded-full font-medium border bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {career.duration_estimate}
              </span>
            )}
          </div>

          {career.short_description && (
            <p className="text-slate-600 text-sm leading-relaxed">
              {career.short_description}
            </p>
          )}

          {career.full_description && (
            <p className="text-slate-600 text-sm leading-relaxed">
              {career.full_description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-violet-500" />
              Salary Progression
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">Junior</p>
              <p className="font-semibold">
                {career.junior_salary_range}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Mid-Level</p>
              <p className="font-semibold">
                {career.mid_salary_range}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Senior</p>
              <p className="font-semibold">
                {career.senior_salary_range}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-violet-500" />
              Skills Roadmap
            </CardTitle>
          </CardHeader>

          <CardContent>
            {skills.length === 0 ? (
              <p className="text-xs text-slate-400">
                No skills added yet.
              </p>
            ) : (
              <div className="space-y-2">
                {skills.map((skill: any, i: number) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-violet-50 transition"
                  >
                    <span className="h-6 w-6 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {skill.name}
                      </p>

                      {skill.description && (
                        <p className="text-xs text-slate-400">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}