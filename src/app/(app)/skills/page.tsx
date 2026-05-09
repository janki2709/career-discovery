// src/app/skills/page.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Plus, BookOpen, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

type Skill = {
  id: string
  name: string
  slug: string
  description: string
  _resourceCount: number
  _completedCount: number
}

export default function SkillsPage() {
  const supabase = createClient()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [])

  const fetchSkills = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    let query = supabase.from('skills').select('id, name, slug, description')
    if (search) query = query.ilike('name', `%${search}%`)
    const { data: skillsData } = await query.order('name')

    if (!skillsData) { setLoading(false); return }

    // Fetch progress for each skill
    const enriched = await Promise.all(
      skillsData.map(async (skill) => {
        const { count: resourceCount } = await supabase
          .from('learning_resources')
          .select('*', { count: 'exact', head: true })
          .eq('skill_id', skill.id)

        const { data: resources } = await supabase
          .from('learning_resources')
          .select('id')
          .eq('skill_id', skill.id)

        const resourceIds = (resources ?? []).map(r => r.id)
        let completedCount = 0
        if (resourceIds.length > 0) {
          const { count } = await supabase
            .from('user_resource_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true)
            .in('learning_resource_id', resourceIds)
          completedCount = count ?? 0
        }

        return {
          ...skill,
          _resourceCount: resourceCount ?? 0,
          _completedCount: completedCount,
        }
      })
    )

    setSkills(enriched)
    setLoading(false)
  }, [search, userId])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Skills Library</h1>
          <p className="text-sm text-slate-500 mt-1">Browse skills and track your learning progress</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <BookOpen className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-700">No skills found</h3>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => {
            const pct = skill._resourceCount > 0
              ? Math.round((skill._completedCount / skill._resourceCount) * 100)
              : 0
            return (
              <Link key={skill.id} href={`/skills/${skill.id}`}>
                <Card className="hover:shadow-md transition cursor-pointer h-full group">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-violet-600" />
                      </div>
                      {pct === 100 && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition">
                        {skill.name}
                      </h3>
                      {skill.description && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{skill.description}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          {skill._resourceCount} resource{skill._resourceCount !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs font-medium text-violet-600">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}