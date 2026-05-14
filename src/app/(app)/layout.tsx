// src/app/(app)/layout.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SidebarNav } from '@/components/sidebar-nav'
import { DashboardHeader } from '@/components/dashboard-header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const fullName = user.user_metadata?.full_name ?? ''

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={{ email: user.email!, fullName }} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}