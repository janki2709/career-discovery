'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CareerCard } from '@/components/career-card'

import { Bookmark } from 'lucide-react'

type SavedCareer = {
  id: string
  career_id: string
  created_at: string
  careers: any
}

export default function SavedCareersPage() {
  const t0 = Date.now()

  const [savedCareers, setSavedCareers] = useState<SavedCareer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSavedCareers = async () => {
      try {
        setLoading(true)

        const t1 = Date.now()
        const response = await fetch('/api/saved-careers')
        console.log(`fetch /api/saved-careers: ${Date.now() - t1}ms`)

        if (response.status === 401) {
          window.location.href = '/login'
          return
        }

        const t2 = Date.now()
        const result = await response.json()
        console.log(`response.json: ${Date.now() - t2}ms`)

        if (!response.ok) {
          throw new Error(
            result.error || 'Failed to fetch saved careers'
          )
        }

        setSavedCareers(result ?? [])
      } catch (err) {
        console.error(err)

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSavedCareers()
  }, [])

  const careers = savedCareers
    .map((item) => item.careers)
    .filter(Boolean)

  console.log(`saved-careers total time: ${Date.now() - t0}ms`)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Saved Careers
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {careers.length} career
          {careers.length !== 1 ? 's' : ''} saved
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : careers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Bookmark className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="text-base font-semibold text-slate-700">
            No saved careers yet
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Browse careers and bookmark the ones you like
          </p>

          <Button
            asChild
            className="mt-4 bg-violet-600 hover:bg-violet-700"
          >
            <Link href="/careers">
              Explore Careers
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              isSaved={true}
              showSaveButton={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}