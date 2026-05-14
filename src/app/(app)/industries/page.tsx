// src/app/(app)/industries/page.tsx

'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Briefcase } from 'lucide-react'

type Industry = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  career_count: number
}

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIndustries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/industries')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          typeof result.error === 'string'
            ? result.error
            : JSON.stringify(result.error)
        )
      }

      setIndustries(result.data ?? [])
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIndustries([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIndustries()
  }, [fetchIndustries])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Industries</h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse careers by the industry sector they operate in.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : industries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Briefcase className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-700">
            No industries found
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industries/${industry.slug}`}>
              <Card className="group hover:shadow-md transition cursor-pointer h-full">
                <CardContent className="p-5 space-y-3 h-full flex flex-col">
                  {/* Icon */}
                  <div className="text-3xl">
                    {industry.icon ?? '🏢'}
                  </div>

                  {/* Name */}
                  <h2 className="font-semibold text-slate-800 group-hover:text-violet-700 transition">
                    {industry.name}
                  </h2>

                  {/* Description */}
                  {industry.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 flex-1">
                      {industry.description}
                    </p>
                  )}

                  {/* Career count */}
                  <p className="text-xs font-medium text-violet-600">
                    {industry.career_count}{' '}
                    {industry.career_count === 1 ? 'career' : 'careers'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}