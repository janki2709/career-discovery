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
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Explore Careers', href: '/careers', icon: Compass },
  { label: 'Career Paths', href: '/career-path', icon: Route },
  { label: 'Skills Library', href: '/skills', icon: BookOpen },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Saved', href: '/saved', icon: Heart },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-white border-r min-h-screen flex flex-col py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
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
      <nav className="flex-1 space-y-1">
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
    </aside>
  )
}