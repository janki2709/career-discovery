'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
} from 'lucide-react'

import { ResourceProgressButton } from '@/components/resource-progress-button'

type Resource = {
  id: string
  title: string
  resource_type: string
  url: string
}

type Skill = {
  id: string
  name: string
  description?: string
  resources: Resource[]
  totalResources: number
  completedResources: number
  progressPercentage: number | null
}

type LearnResponse = {
  career: {
    id: string
    title: string
    image_url?: string
  }

  skills: Skill[]

  progress: {
    completedResources: number
    totalResources: number
    overallProgress: number
  }

  completedResourceIds: string[]
}

export default function CareerLearnPage() {
  const params = useParams()

  const [data, setData] =
    useState<LearnResponse | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const fetchLearningData = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `/api/careers/${params.id}/learn`
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error ||
            'Failed to load learning page'
        )
      }

      setData(result)
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
    fetchLearningData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Loading learning experience...
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error || 'Failed to load'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-slate-500"
      >
        <Link href={`/careers/${data.career.id}`}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Career
        </Link>
      </Button>

      {/* Header */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {data.career.title}
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                {data.progress.completedResources} /{' '}
                {data.progress.totalResources}{' '}
                resources completed
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-violet-600">
                {data.progress.overallProgress}%
              </p>

              <p className="text-xs text-slate-400">
                Overall Progress
              </p>
            </div>
          </div>

          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all"
              style={{
                width: `${data.progress.overallProgress}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <div className="space-y-4">
        {data.skills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {skill.name}
                  </CardTitle>

                  {skill.description && (
                    <p className="text-sm text-slate-500 mt-1">
                      {skill.description}
                    </p>
                  )}
                </div>

                {skill.progressPercentage !==
                  null && (
                  <div className="text-right">
                    <p className="text-lg font-semibold text-violet-600">
                      {skill.progressPercentage}%
                    </p>

                    <p className="text-xs text-slate-400">
                      Skill Progress
                    </p>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {skill.resources.length === 0 ? (
                <div className="rounded-lg border border-dashed p-4 text-sm text-slate-400">
                  No resources available yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {skill.resources.map(
                    (resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between gap-4 rounded-xl border p-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="h-4 w-4 text-violet-500" />

                            <p className="font-medium text-slate-800">
                              {resource.title}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border">
                              {
                                resource.resource_type
                              }
                            </span>

                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-violet-600 hover:text-violet-700 inline-flex items-center gap-1"
                            >
                              Open Resource

                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        <ResourceProgressButton
                          resourceId={
                            resource.id
                          }
                          initialCompleted={data.completedResourceIds.includes(
                            resource.id
                          )}
                          onToggle={() =>
                            fetchLearningData()
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}