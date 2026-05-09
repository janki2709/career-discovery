'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Compass,
  BookOpen,
  Heart,
  TrendingUp,
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Explore Careers', href: '/careers', icon: Compass },
  { label: 'Skills Library', href: '/skills', icon: BookOpen },
  { label: 'Saved', href: '/saved', icon: Heart },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-white border-r min-h-screen flex flex-col py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="h-7 w-7 rounded-full bg-violet-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">C</span>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-800">Career Discover</p>
          <p className="text-xs text-slate-400">Library</p>
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