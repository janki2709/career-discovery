// src/app/(app)/dashboard/components/category-section.tsx

import Link from 'next/link'
import {
  Cpu,
  TrendingUp,
  Heart,
  Palette,
  Wrench,
  GraduationCap,
  Briefcase,
} from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Technology: <Cpu className="h-4 w-4" />,
  Business: <TrendingUp className="h-4 w-4" />,
  Healthcare: <Heart className="h-4 w-4" />,
  'Creative Arts': <Palette className="h-4 w-4" />,
  Engineering: <Wrench className="h-4 w-4" />,
  Education: <GraduationCap className="h-4 w-4" />,
}

interface CategorySectionProps {
  categories: any[]
}

export function CategorySection({
  categories,
}: CategorySectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Explore by Category
        </h2>

        <Link
          href="/careers"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View all
        </Link>
      </div>

      {(categories ?? []).length === 0 ? (
        <p className="text-sm text-slate-400">
          No categories found.
        </p>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">

            {(categories ?? []).map((cat, index) => {

              const iconStyles = [
                'bg-violet-100 text-violet-600',
                'bg-blue-100 text-blue-600',
                'bg-emerald-100 text-emerald-600',
                'bg-orange-100 text-orange-600',
                'bg-indigo-100 text-indigo-600',
                'bg-cyan-100 text-cyan-600',
              ]

              return (
                <Link
                  key={cat.id}
                  href={`/careers?category_id=${cat.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all hover:border-violet-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        iconStyles[index % iconStyles.length]
                      }`}
                    >
                      {CATEGORY_ICONS[cat.name] ?? (
                        <Briefcase className="h-6 w-6" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        {cat.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {cat.careers?.[0]?.count ?? 0} careers
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Right arrow */}
          <button
            className="absolute -right-5 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm lg:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}