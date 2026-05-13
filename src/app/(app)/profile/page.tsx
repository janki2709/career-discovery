// src/app/profile/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, User } from 'lucide-react'
import { toast } from 'sonner'

type Profile = {
  full_name: string
  email: string
  grade_level: string
  education_stream: string
  school_or_college_name: string
  city: string
}

export default function ProfilePage() {
  const t0 = Date.now()

  const t1 = Date.now()
  const supabase = createClient()
  console.log(`createClient: ${Date.now() - t1}ms`)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [form, setForm] = useState<Profile>({
    full_name: '',
    email: '',
    grade_level: '',
    education_stream: '',
    school_or_college_name: '',
    city: '',
  })

  useEffect(() => {
    async function load() {
      const t2 = Date.now()
      const { data: { user } } = await supabase.auth.getUser()
      console.log(`auth.getUser: ${Date.now() - t2}ms`)

      if (!user) return
      setUserId(user.id)

      const t3 = Date.now()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      console.log(`query profiles: ${Date.now() - t3}ms`)

      if (data) {
        setForm({
          full_name: data.full_name ?? '',
          email: data.email ?? user.email ?? '',
          grade_level: data.grade_level ?? '',
          education_stream: data.education_stream ?? '',
          school_or_college_name: data.school_or_college_name ?? '',
          city: data.city ?? '',
        })
      }

      setLoading(false)
    }

    load()
  }, [])

  const set = (key: keyof Profile, val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()

    if (!userId) return

    setSaving(true)

    const t4 = Date.now()
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name,
        grade_level: form.grade_level,
        education_stream: form.education_stream,
        school_or_college_name: form.school_or_college_name,
        city: form.city,
      })
      .eq('id', userId)
    console.log(`update profiles: ${Date.now() - t4}ms`)

    setSaving(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Profile updated!')
  }

  console.log(`total: ${Date.now() - t0}ms`)

  if (loading) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
          <User className="h-7 w-7 text-violet-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">{form.full_name || 'Your Name'}</p>
          <p className="text-sm text-slate-500">{form.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={form.email} disabled className="bg-slate-50 text-slate-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Grade / Year</Label>
                <Input value={form.grade_level} onChange={e => set('grade_level', e.target.value)} placeholder="e.g. 12th Grade" />
              </div>
              <div className="space-y-1.5">
                <Label>Stream / Major</Label>
                <Input value={form.education_stream} onChange={e => set('education_stream', e.target.value)} placeholder="e.g. Computer Science" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>School / College</Label>
                <Input value={form.school_or_college_name} onChange={e => set('school_or_college_name', e.target.value)} placeholder="Institution name" />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Mumbai" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-violet-600 hover:bg-violet-700" disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}