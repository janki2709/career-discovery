// src/app/skills/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, BookOpen, CheckCircle2, Circle, ExternalLink, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Resource = {
  id: string
  title: string
  resource_type: string
  url: string
  completed: boolean
  toggling: boolean
}

type Skill = {
  id: string
  name: string
  description: string
}

export default function SkillDetailPage() {
  const t0 = Date.now()

  const params = useParams()
  const id = params.id as string

  const t1 = Date.now()
  const supabase = createClient()
  console.log(`SkillDetailPage createClient: ${Date.now() - t1}ms`)

  const [skill, setSkill] = useState<Skill | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const t2 = Date.now()

    supabase.auth.getUser().then(({ data }) => {
      console.log(`SkillDetailPage auth.getUser: ${Date.now() - t2}ms`)
      setUserId(data.user?.id ?? null)
    })
  }, [])

  useEffect(() => {
    if (!userId) return

    async function load() {
      setLoading(true)

      const t3 = Date.now()

      const { data: skillData } = await supabase
        .from('skills')
        .select('id, name, description')
        .eq('id', id)
        .single()

      console.log(`SkillDetailPage query skills: ${Date.now() - t3}ms`)

      if (!skillData) {
        setLoading(false)
        return
      }

      setSkill(skillData)

      const t4 = Date.now()

      const { data: resourcesData } = await supabase
        .from('learning_resources')
        .select('id, title, resource_type, url')
        .eq('skill_id', id)
        .order('created_at')

      console.log(`SkillDetailPage query learning_resources: ${Date.now() - t4}ms`)

      const t5 = Date.now()

      const { data: progressData } = await supabase
        .from('user_resource_progress')
        .select('learning_resource_id, completed')
        .eq('user_id', userId!)

      console.log(`SkillDetailPage query user_resource_progress: ${Date.now() - t5}ms`)

      const completedSet = new Set(
        (progressData ?? [])
          .filter(p => p.completed)
          .map(p => p.learning_resource_id)
      )

      setResources(
        (resourcesData ?? []).map(r => ({
          ...r,
          completed: completedSet.has(r.id),
          toggling: false,
        }))
      )

      setLoading(false)
    }

    load()
  }, [userId, id])

  async function toggleResource(
    resourceId: string,
    currentlyCompleted: boolean
  ) {
    setResources(prev =>
      prev.map(r =>
        r.id === resourceId
          ? { ...r, toggling: true }
          : r
      )
    )

    try {
      const t6 = Date.now()

      const response = await fetch(
        currentlyCompleted
          ? `/api/resource-progress?resourceId=${resourceId}`
          : '/api/resource-progress',
        {
          method: currentlyCompleted ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: currentlyCompleted
            ? undefined
            : JSON.stringify({ resourceId }),
        }
      )

      console.log(`SkillDetailPage fetch resource-progress: ${Date.now() - t6}ms`)

      const t7 = Date.now()

      const data = await response.json()

      console.log(`SkillDetailPage response.json: ${Date.now() - t7}ms`)

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setResources(prev =>
        prev.map(r =>
          r.id === resourceId
            ? {
                ...r,
                completed: !currentlyCompleted,
                toggling: false,
              }
            : r
        )
      )

      toast.success(
        currentlyCompleted
          ? 'Marked incomplete'
          : 'Marked complete!'
      )
    } catch (error) {
      setResources(prev =>
        prev.map(r =>
          r.id === resourceId
            ? { ...r, toggling: false }
            : r
        )
      )

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update progress'
      )
    }
  }

  const completedCount = resources.filter(r => r.completed).length

  const pct =
    resources.length > 0
      ? Math.round((completedCount / resources.length) * 100)
      : 0

  console.log(`SkillDetailPage total: ${Date.now() - t0}ms`)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-slate-500">Skill not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/skills">Back to Skills</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="text-slate-500">
        <Link href="/skills">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Skills
        </Link>
      </Button>

      {/* Skill Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-800">{skill.name}</h1>
              {skill.description && (
                <p className="text-sm text-slate-500 mt-1">{skill.description}</p>
              )}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {completedCount} of {resources.length} completed
                  </span>
                  <span className={`text-sm font-bold ${pct === 100 ? 'text-green-600' : 'text-violet-600'}`}>
                    {pct}%
                  </span>
                </div>
                <Progress
                  value={pct}
                  className={`h-2 ${pct === 100 ? '[&>div]:bg-green-500' : ''}`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {resources.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No resources added yet.</p>
          ) : (
            <div className="space-y-2">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center gap-3 p-3 rounded-xl border hover:border-violet-200 hover:bg-violet-50/50 transition group"
                >
                  <button
                    onClick={() => toggleResource(resource.id, resource.completed)}
                    disabled={resource.toggling}
                    className="shrink-0 focus:outline-none"
                  >
                    {resource.toggling ? (
                      <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
                    ) : resource.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 group-hover:text-violet-400 transition" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${resource.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {resource.title}
                    </p>
                    {resource.resource_type && (
                      <span className="text-xs text-slate-400 capitalize">{resource.resource_type}</span>
                    )}
                  </div>

                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-slate-400 hover:text-violet-600 transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}