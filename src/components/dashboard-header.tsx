'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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

interface SearchResults {
  careers: any[]
  skills: any[]
  industries: any[]
  resources: any[]
}

export function DashboardHeader({ user }: Props) {
  const router = useRouter()

  const [query, setQuery] = useState('')

  const [results, setResults] = useState<SearchResults>({
    careers: [],
    skills: [],
    industries: [],
    resources: [],
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({
        careers: [],
        skills: [],
        industries: [],
        resources: [],
      })

      setOpen(false)
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        )

        const data = await res.json()

        setResults(data)
        setOpen(true)
      } catch (error) {
        console.error(error)
      }
    }, 250)

    return () => clearTimeout(timeout)
  }, [query])

  const handleLogout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <header className="h-14 bg-white border-b flex items-center gap-4 px-6 shrink-0">
      
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          <Search className="h-4 w-4" />
        </div>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers, skills, industries..."
          className="pl-10"
        />

        {open && (
          <div className="absolute top-full mt-2 w-full rounded-xl border bg-white shadow-lg z-50 max-h-[500px] overflow-y-auto">

            {/* Careers */}
            {results.careers.length > 0 && (
              <div className="p-2">
                <p className="px-2 py-1 text-xs font-semibold text-slate-500">
                  Careers
                </p>

                {results.careers.map((career: any) => (
                  <Link
                    key={career.id}
                    href={`/careers/${career.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    <p className="font-medium text-sm">
                      {career.title}
                    </p>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {career.short_description}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {/* Skills */}
            {results.skills.length > 0 && (
              <div className="p-2 border-t">
                <p className="px-2 py-1 text-xs font-semibold text-slate-500">
                  Skills
                </p>

                {results.skills.map((skill: any) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Industries */}
            {results.industries.length > 0 && (
              <div className="p-2 border-t">
                <p className="px-2 py-1 text-xs font-semibold text-slate-500">
                  Industries
                </p>

                {results.industries.map((industry: any) => (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Learning Resources */}
            {results.resources.length > 0 && (
              <div className="p-2 border-t">
                <p className="px-2 py-1 text-xs font-semibold text-slate-500">
                  Learning Resources
                </p>

                {results.resources.map((resource: any) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    <p className="text-sm font-medium">
                      {resource.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {resource.resource_type}
                    </p>
                  </a>
                ))}
              </div>
            )}

            {/* No Results */}
            {results.careers.length === 0 &&
              results.skills.length === 0 &&
              results.industries.length === 0 &&
              results.resources.length === 0 && (
                <div className="p-4 text-sm text-slate-500 text-center">
                  No results found
                </div>
              )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
          <Bell className="h-4 w-4" />
        </button>

        <button
          onClick={() => router.push('/bookmarks')}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
        >
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
                <p className="text-xs font-medium text-slate-800">
                  {user.fullName || user.email}
                </p>

                <p className="text-xs text-slate-400">
                  Explorer
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              My Profile
            </DropdownMenuItem>

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

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}