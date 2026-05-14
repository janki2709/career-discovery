// src/components/sidebar-nav.ts

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Compass,
  BookOpen,
  Heart,
  TrendingUp,
  Building2,
  Route,
  Bookmark,
  ClipboardCheck,
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Explore Careers', href: '/careers', icon: Compass },
  { label: 'Career Paths', href: '/career-path', icon: Route },
  { label: 'Skills Library', href: '/skills', icon: BookOpen },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Assessments', href: '/assessments', icon: ClipboardCheck },
  { label: 'Saved', href: '/saved', icon: Heart },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-72 shrink-0 bg-white border-r min-h-screen flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="h-11 w-11 rounded-full border-2 border-violet-500 flex items-center justify-center">
          <Compass className="h-5 w-5 text-violet-500" strokeWidth={2.5} />
        </div>

        <div className="leading-tight">
          <p className="text-[15px] font-semibold text-slate-900">
            Career Discover
          </p>

          <p className="text-[13px] text-slate-400 font-medium">
            Library
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    
      {/* Assessment Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3">
        <div className="overflow-hidden rounded-xl">
          <img
            src="/assessment-card.png"
            alt="Assessment"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="px-1 pt-4">
          <h3 className="text-[22px] leading-7 font-semibold text-slate-900">
            Not sure where to start?
          </h3>

          <p className="mt-2 text-[15px] leading-6 text-slate-500">
            Take an assessment and get personalized career recommendations.
          </p>

          <Link
            href="/assessments"
            className="mt-5 flex h-12 items-center justify-center rounded-xl bg-violet-600 text-[15px] font-semibold text-white transition hover:bg-violet-700"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    </aside>

  )
}