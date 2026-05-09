// src/components/career-card.tsx

import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { SaveCareerButton } from '@/components/save-career-button'
import type { CareerWithCategory } from '@/lib/types'

interface Props {
  career: CareerWithCategory
  isSaved?: boolean
  showSaveButton?: boolean
}

const DEMAND_STYLES: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-500 border-slate-200',
}

export function CareerCard({ career, isSaved = false, showSaveButton = true }: Props) {
  const demandKey = career.demand?.toLowerCase() ?? ''
  const categoryName = (career.categories as { name: string } | null)?.name ?? ''

  return (
    <Card className="hover:shadow-md transition group h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full gap-3">
        {/* Thumbnail */}
        <div className="h-24 bg-gradient-to-br from-violet-50 to-indigo-100 rounded-lg flex items-center justify-center">
          <Briefcase className="h-8 w-8 text-violet-300" />
        </div>

        {/* Title + category */}
        <div className="flex-1">
          <Link href={`/careers/${career.id}`}>
            <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition line-clamp-2 leading-snug">
              {career.title}
            </h3>
          </Link>
          {categoryName && (
            <p className="text-xs text-slate-400 mt-1">{categoryName}</p>
          )}
        </div>

        {/* Footer: demand + salary + save */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {demandKey && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DEMAND_STYLES[demandKey] ?? 'bg-slate-100 text-slate-500'}`}
              >
                {demandKey.charAt(0).toUpperCase() + demandKey.slice(1)} Demand
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {career.mid_salary_range && (
              <span className="text-sm font-semibold text-slate-700">
                {career.mid_salary_range}
              </span>
            )}
            {showSaveButton && (
              <SaveCareerButton careerId={career.id} initialSaved={isSaved} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}