// src/components/dashboard-header.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, Bell, Bookmark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  user: {
    email: string
    fullName: string
  }
}

export function DashboardHeader({ user }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/careers?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const initials = user.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <header className="h-14 bg-white border-b flex items-center gap-4 px-6 shrink-0">
      {/* Search */}

      <div className="flex items-center gap-3 ml-auto">
        <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
          <Bookmark className="h-4 w-4" />
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1">
              <div className="h-7 w-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-semibold">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-medium text-slate-800">{user.fullName || user.email}</p>
                <p className="text-xs text-slate-400">Explorer</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/saved')}>
              Saved Careers
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/progress')}>
              My Progress
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}