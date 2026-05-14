import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Cpu,
  TrendingUp,
  Heart,
  Palette,
  Wrench,
  GraduationCap,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Technology: <Cpu className="h-4 w-4" />,
  Business: <TrendingUp className="h-4 w-4" />,
  Healthcare: <Heart className="h-4 w-4" />,
  'Creative Arts': <Palette className="h-4 w-4" />,
  Engineering: <Wrench className="h-4 w-4" />,
  Education: <GraduationCap className="h-4 w-4" />,
}

const DEMAND_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

function formatSalary(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}


const getCachedStaticData = unstable_cache(
  async () => {
    // Cookie-free client. Safe for RLS-disabled tables only.
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [
      { data: categories },
      { data: popularCareers },
      { data: skills },
      { data: recommended },
    ] = await Promise.all([
      supabase
  .from('categories')
  .select(`
    id,
    name,
    careers(count)
  `)
  .limit(6),
      supabase
        .from('careers')
        .select('id, title, demand_level, avg_salary, categories(name)')
        .limit(4),
      supabase
        .from('skills')
        .select('id, name, demand_percentage')
        .order('demand_percentage', { ascending: false })
        .limit(3),
      supabase
        .from('careers')
        .select('id, title, demand_level, categories(name)')
        .order('id', { ascending: false })
        .limit(3),
    ])

    return { categories, popularCareers, skills, recommended }
  },
  ['dashboard-static-data'],
  { revalidate: 3600 }
)

export default async function DashboardPage() {
  const t0 = Date.now()
  const supabase = await createClient()
  console.log(`createClient: ${Date.now() - t0}ms`)

  // getUser() must always be a live call. Never cache this.
  // Supabase validates the JWT server-side on this call.
  const t1 = Date.now()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  console.log(`getUser: ${Date.now() - t1}ms`)

  // Run the cached static data fetch and the live user-specific query in parallel.
  // The 4 static queries will hit the cache after the first request.
  const t2 = Date.now()
  const [{ categories, popularCareers, skills, recommended }, { data: userProgress }] =
    await Promise.all([
      getCachedStaticData(),

      // userProgress is user-specific, so it must remain a live query.
      supabase
        .from('user_skill_progress')
        .select('id, career_path_name, progress_percentage')
        .eq('user_id', user.id)
        .limit(3),
    ])
  console.log(`queries (static cached + live user): ${Date.now() - t2}ms`)
  console.log(`total: ${Date.now() - t0}ms`)

  return (
    <div className="flex gap-6">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Hero */}
{/* Hero */}
<div className="relative overflow-hidden rounded-[28px] border border-[#ECEAF8] bg-gradient-to-r from-[#F5F1FF] via-[#F8F7FF] to-[#EEF5FF] px-8 py-10 lg:px-10 lg:py-12">
  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Content */}
    <div className="max-w-[420px] space-y-5">
      <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-1.5px] text-[#111827]">
        Discover careers that
        <br />
        fit you best
      </h1>

      <p className="max-w-[360px] text-[17px] leading-7 text-[#6B7280]">
        Explore career options, learn key skills, and build
        your path to a successful future.
      </p>

      <Button
        asChild
        className="h-12 rounded-xl bg-violet-600 px-6 text-sm font-semibold hover:bg-violet-700"
      >
        <Link href="/careers">Explore Careers</Link>
      </Button>
    </div>

    {/* Right Visual */}
    <div className="relative hidden h-[320px] flex-1 lg:block">

      {/* Dotted connection lines */}
      <div className="absolute inset-0 opacity-40">
        <svg
          className="h-full w-full"
          viewBox="0 0 600 320"
          fill="none"
        >
          <path
            d="M140 80 C220 80, 260 160, 340 160"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d="M140 220 C240 220, 280 120, 380 120"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d="M340 160 C430 160, 470 220, 540 220"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Center Character Placeholder */}
<img
  src="/illustrations/girl-career.png"
  alt="Career Illustration"
  className="absolute left-1/2 top-1/2 z-10 h-[290px] -translate-x-1/2 -translate-y-1/2 object-contain"
/>

      {/* Floating Cards */}
      <div className="absolute left-10 top-8 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Data Analyst
          </span>
        </div>
      </div>

      <div className="absolute left-24 top-40 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Palette className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            UI/UX Designer
          </span>
        </div>
      </div>

      <div className="absolute right-16 top-14 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Briefcase className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Product Basics
          </span>
        </div>
      </div>

      <div className="absolute right-0 top-32 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Cpu className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Cybersecurity Analyst
          </span>
        </div>
      </div>

      <div className="absolute right-10 bottom-4 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Marketing Specialist
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Explore by Category */}
{/* Explore by Category */}
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
    <p className="text-sm text-slate-400">No categories found.</p>
  ) : (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
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

      </div>

    </div>
  )
}