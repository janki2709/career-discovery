'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Progress } from '@/components/ui/progress'

import { Button } from '@/components/ui/button'

import {
  ArrowRight,
  BookOpen,
  TrendingUp,
} from 'lucide-react'

type CareerProgress = {
  id: string
  title: string
  image_url: string | null
  totalResources: number
  completedResources: number
  progress: number
}

export default function ProgressPage() {
  const t0 = Date.now()

  const [careers, setCareers] = useState<
    CareerProgress[]
  >([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const fetchProgress = async () => {
    try {
      setLoading(true)

      const t1 = Date.now()
      const response = await fetch(
        '/api/progress'
      )
      console.log(`fetch /api/progress: ${Date.now() - t1}ms`)

      const t2 = Date.now()
      const result = await response.json()
      console.log(`response.json: ${Date.now() - t2}ms`)

      if (!response.ok) {
        throw new Error(
          result.error ||
            'Failed to load progress'
        )
      }

      setCareers(result)
    } catch (error) {
      console.error(error)

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProgress()
  }, [])

  console.log(`total: ${Date.now() - t0}ms`)

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Loading progress...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Learning Progress
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Continue your active career
          journeys
        </p>
      </div>

      {careers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <TrendingUp className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="text-base font-semibold text-slate-700">
            No learning progress yet
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Start learning a career and
            complete resources to track
            progress
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {careers.map((career) => (
            <Card
              key={career.id}
              className="overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-to-br from-violet-100 to-indigo-100">
                  {career.image_url ? (
                    <img
                      src={career.image_url}
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {career.title}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {
                          career.completedResources
                        }{' '}
                        /{' '}
                        {
                          career.totalResources
                        }{' '}
                        resources completed
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-violet-600">
                        {career.progress}%
                      </p>

                      <p className="text-xs text-slate-400">
                        Progress
                      </p>
                    </div>
                  </div>

                  <Progress
                    value={career.progress}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <BookOpen className="h-4 w-4" />

                      Active Learning
                    </div>

                    <Button
                      asChild
                      size="sm"
                    >
                      <Link
                        href={`/careers/${career.id}/learn`}
                      >
                        Continue

                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}