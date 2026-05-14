import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

const DEMAND_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

interface PopularCareerCardProps {
  career: any
}

export function PopularCareerCard({
  career,
}: PopularCareerCardProps) {
  return (
    <Link
      href={`/careers/${career.id}`}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={
            career.image_url ||
            'https://placehold.co/600x400/png'
          }
          alt={career.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3 p-4">

        <div>
          <div className="line-clamp-1 text-base font-semibold text-slate-900">
            {career.title}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {career.categories?.name ?? 'Career'}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          {career.short_description}
        </p>

        <Badge
          className={`border ${
            DEMAND_BADGE[career.demand] ??
            DEMAND_BADGE.low
          }`}
        >
          {career.demand} Demand
        </Badge>

        <div className="flex items-center justify-between pt-2">

          <span className="text-xs text-slate-500">
            Avg. Salary
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {career.mid_salary_range}
          </span>
        </div>
      </div>
    </Link>
  )
}