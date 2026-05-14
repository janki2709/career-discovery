import Link from 'next/link'
import { PopularCareerCard } from './popular-career-card'

interface PopularCareersSectionProps {
  careers: any[]
}

export function PopularCareersSection({
  careers,
}: PopularCareersSectionProps) {
  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Popular Careers
        </h2>

        <Link
          href="/careers"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {(careers ?? []).map((career: any) => (
        <PopularCareerCard
            key={career.id}
            career={career}
        />
        ))}
      </div>
    </section>
  )
}