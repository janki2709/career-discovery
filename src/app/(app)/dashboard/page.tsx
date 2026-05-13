import { createClient } from '@/lib/supabase/server'
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

export default async function DashboardPage() {
  const t0 = Date.now()
  const supabase = await createClient()
  console.log(`createClient: ${Date.now() - t0}ms`)

  const t1 = Date.now()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  console.log(`getUser: ${Date.now() - t1}ms`)

  const t2 = Date.now()
  const [
    { data: categories },
    { data: popularCareers },
    { data: skills },
    { data: userProgress },
    { data: recommended },
  ] = await Promise.all([
    supabase.from('categories').select('id, name').limit(6),

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
      .from('user_skill_progress')
      .select('id, career_path_name, progress_percentage')
      .eq('user_id', user.id)
      .limit(3),

    supabase
      .from('careers')
      .select('id, title, demand_level, categories(name)')
      .order('id', { ascending: false })
      .limit(3),
  ])
  console.log(`all queries: ${Date.now() - t2}ms`)
  console.log(`total: ${Date.now() - t0}ms`)

  return (
    <div className="flex gap-6">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-indigo-50 to-blue-50 border border-violet-100 p-8 flex items-center justify-between">
          <div className="space-y-4 max-w-sm">
            <h1 className="text-3xl font-bold text-slate-800 leading-tight">
              Discover careers that<br />fit you best
            </h1>
            <p className="text-slate-500 text-sm">
              Explore career options, learn key skills, and build your path to a successful future.
            </p>
            <Button asChild className="bg-violet-600 hover:bg-violet-700">
              <Link href="/careers">Explore Careers</Link>
            </Button>
          </div>

          <div className="hidden lg:flex flex-col gap-2">
            {['Data Analyst', 'UI/UX Designer', 'Product Basics', 'Cybersecurity Analyst', 'Marketing Specialist'].map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 bg-white/80 backdrop-blur rounded-full border border-white shadow-sm text-xs text-slate-600 font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Explore by Category */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-800">Explore by Category</h2>
            <Link href="/careers" className="text-sm text-violet-600 hover:underline">
              View all
            </Link>
          </div>

          {(categories ?? []).length === 0 ? (
            <p className="text-sm text-slate-400">No categories found.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {(categories ?? []).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/careers?category_id=${cat.id}`}
                  className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border hover:border-violet-300 hover:shadow-sm transition text-center"
                >
                  <div className="h-9 w-9 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                    {CATEGORY_ICONS[cat.name] ?? <Briefcase className="h-4 w-4" />}
                  </div>
                  <span className="text-xs font-medium text-slate-700 leading-tight">{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>

    </div>
  )
}