// src/app/(app)/industries/[slug]/page.tsx

import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SaveCareerButton } from '@/components/save-career-button'

import { headers } from 'next/headers'

import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
  Search,
} from 'lucide-react'

const DEMAND_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

export default async function IndustryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search?: string
    demand?: string
    page?: string
  }>
}) {
  const t0 = Date.now()

  const t1 = Date.now()
  const { slug } = await params
  console.log(`industry params: ${Date.now() - t1}ms`)

  const t2 = Date.now()
  const filters = await searchParams
  console.log(`industry searchParams: ${Date.now() - t2}ms`)

  const t3 = Date.now()
  const supabase = await createClient()
  console.log(`industry createClient: ${Date.now() - t3}ms`)

  const t4 = Date.now()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log(`industry auth.getUser: ${Date.now() - t4}ms`)

  if (!user) {
    redirect('/login')
  }

  const t5 = Date.now()
  const headersList = await headers()
  console.log(`industry headers: ${Date.now() - t5}ms`)

  const host = headersList.get('host')

  const protocol =
    process.env.NODE_ENV === 'development'
      ? 'http'
      : 'https'

  const query = new URLSearchParams()

  if (filters.search) {
    query.set('search', filters.search)
  }

  if (filters.demand) {
    query.set('demand', filters.demand)
  }

  if (filters.page) {
    query.set('page', filters.page)
  }

  const t6 = Date.now()
  const res = await fetch(
    `${protocol}://${host}/api/industries/${slug}?${query.toString()}`,
    {
      cache: 'no-store',
    }
  )
  console.log(`industry fetch api: ${Date.now() - t6}ms`)

  if (!res.ok) {
    notFound()
  }

  const t7 = Date.now()
  const text = await res.text()
  console.log(`industry response.text: ${Date.now() - t7}ms`)

  const parsed = JSON.parse(text)

  const industry = parsed.industry
  const careers = parsed.data ?? []

  console.log(`industry total: ${Date.now() - t0}ms`)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-slate-500"
        >
          <Link href="/industries">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Industries
          </Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-violet-100 to-indigo-100">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Briefcase className="h-8 w-8 text-violet-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {industry.name}
              </h1>

              <p className="text-slate-600 mt-2 max-w-2xl">
                {industry.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t bg-white px-6 py-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-violet-500" />
            {parsed.total} Careers
          </div>

          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-violet-500" />
            Page {parsed.page} of {parsed.totalPages}
          </div>
        </div>
      </div>

      {/* Careers */}
      {careers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">
              No careers found for this industry.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {careers.map((career: any) => {
            const demandKey =
              career.demand?.toLowerCase() ?? ''

            return (
              <Card
                key={career.id}
                className="overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-44 bg-slate-100">
                  {career.image_url ? (
                    <img
                      src={career.image_url}
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Briefcase className="h-10 w-10 text-slate-300" />
                    </div>
                  )}
                </div>

                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-violet-600 font-medium mb-1">
                        {career.categories?.name ?? ''}
                      </p>

                      <h2 className="font-semibold text-slate-800 line-clamp-2">
                        {career.title}
                      </h2>
                    </div>

                    <SaveCareerButton
                      careerId={career.id}
                      initialSaved={career.is_saved}
                    />
                  </div>

                  {career.short_description && (
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {career.short_description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {demandKey && (
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium border ${
                          DEMAND_BADGE[demandKey] ?? ''
                        }`}
                      >
                        {demandKey.charAt(0).toUpperCase() +
                          demandKey.slice(1)}{' '}
                        Demand
                      </span>
                    )}

                    {career.difficulty_level && (
                      <span className="text-xs px-3 py-1 rounded-full font-medium border bg-slate-100 text-slate-600 border-slate-200">
                        {career.difficulty_level}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-slate-500">
                        Junior:
                      </span>{' '}
                      <span className="font-medium">
                        {career.junior_salary_range}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Mid:
                      </span>{' '}
                      <span className="font-medium">
                        {career.mid_salary_range}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Senior:
                      </span>{' '}
                      <span className="font-medium">
                        {career.senior_salary_range}
                      </span>
                    </div>
                  </div>

<div className="grid grid-cols-2 gap-2">
  <Button asChild variant="outline">
    <Link href={`/careers/${career.id}`}>
      View Career
    </Link>
  </Button>

  <Button asChild>
    <Link href={`/career-path/${career.slug}`}>
      View Career Path
    </Link>
  </Button>
</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}