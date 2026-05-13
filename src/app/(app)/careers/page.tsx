// src/app/(app)/careers/page.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { Search, Plus } from 'lucide-react'

import { SaveCareerButton } from '@/components/save-career-button'

const DEMAND_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-blue-100 text-blue-700 border-blue-200',
  intermediate: 'bg-orange-100 text-orange-700 border-orange-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

type Career = {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string
  demand: string
  difficulty_level: string
  junior_salary_range: string
  mid_salary_range: string
  senior_salary_range: string
  duration_estimate: string
  image_url: string | null
  featured: boolean
  categories: { id: string; name: string } | null
  is_saved?: boolean
}

type Category = {
  id: string
  name: string
}

export default function CareersPage() {
  const t0 = Date.now()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [careers, setCareers] = useState<Career[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [filtersInitialized, setFiltersInitialized] = useState(false)
  const [demandFilter, setDemandFilter] = useState('all')

  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)

  const PAGE_SIZE = 9

  useEffect(() => {
    const categoryId = searchParams.get('category_id')

    if (categoryId) {
      setCategoryFilter(categoryId)
    }

    setFiltersInitialized(true)
  }, [searchParams])

  const fetchCareers = useCallback(async () => {
    const t1 = Date.now()

    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()

      if (search.trim()) {
        params.set('search', search)
      }

      if (categoryFilter !== 'all') {
        params.set('category_id', categoryFilter)
      }

      if (demandFilter !== 'all') {
        params.set('demand', demandFilter)
      }

      params.set('page', String(page))
      params.set('limit', String(PAGE_SIZE))

      const t2 = Date.now()
      const response = await fetch(`/api/careers?${params.toString()}`)
      console.log(`fetch careers api: ${Date.now() - t2}ms`)

      const t3 = Date.now()
      const result = await response.json()
      console.log(`response.json careers: ${Date.now() - t3}ms`)

      if (!response.ok) {
        throw new Error(
          typeof result.error === 'string'
            ? result.error
            : JSON.stringify(result.error)
        )
      }

      setCareers(result.data ?? [])
      setTotal(result.total ?? 0)
    } catch (err) {
      console.error(err)

      setError(err instanceof Error ? err.message : 'Something went wrong')

      setCareers([])
      setTotal(0)
    } finally {
      setLoading(false)
      console.log(`fetchCareers total: ${Date.now() - t1}ms`)
    }
  }, [search, categoryFilter, demandFilter, page])

  const fetchCategories = useCallback(async () => {
    const t4 = Date.now()

    try {
      const t5 = Date.now()
      const response = await fetch('/api/categories')
      console.log(`fetch categories api: ${Date.now() - t5}ms`)

      const t6 = Date.now()
      const result = await response.json()
      console.log(`response.json categories: ${Date.now() - t6}ms`)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch categories')
      }

      setCategories(result.data ?? result ?? [])
    } catch (err) {
      console.error(err)
    } finally {
      console.log(`fetchCategories total: ${Date.now() - t4}ms`)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    setPage(1)
  }, [search, categoryFilter, demandFilter])

  useEffect(() => {
    if (!filtersInitialized) return

    fetchCareers()
  }, [fetchCareers, filtersInitialized])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  console.log(`total: ${Date.now() - t0}ms`)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Explore Careers
          </h1>

        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={demandFilter} onValueChange={setDemandFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Demand" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Demand</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : careers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="text-base font-semibold text-slate-700">
            No careers found
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Try adjusting your search or filters
          </p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch('')
              setCategoryFilter('all')
              setDemandFilter('all')
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((career) => {
            const demandKey = career.demand?.toLowerCase() ?? ''

            const difficultyKey =
              career.difficulty_level?.toLowerCase() ?? ''

            return (
              <Card
                key={career.id}
                className="group hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="h-36 bg-gradient-to-br from-violet-100 to-indigo-100 relative overflow-hidden">
                    {career.image_url ? (
                      <img
                        src={career.image_url}
                        alt={career.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-100 to-indigo-100" />
                    )}

                    <div className="absolute top-2 right-2">
                      <SaveCareerButton
                        careerId={career.id}
                        initialSaved={career.is_saved}
                      />
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <Link href={`/careers/${career.id}`}>
                        <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition">
                          {career.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 mt-0.5">
                        {(career.categories as any)?.name ?? ''}
                      </p>
                    </div>

                    {career.short_description && (
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {career.short_description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {demandKey && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                            DEMAND_BADGE[demandKey] ?? ''
                          }`}
                        >
                          {demandKey.charAt(0).toUpperCase() +
                            demandKey.slice(1)}{' '}
                          Demand
                        </span>
                      )}

                      {difficultyKey && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                            DIFFICULTY_BADGE[difficultyKey] ?? ''
                          }`}
                        >
                          {difficultyKey.charAt(0).toUpperCase() +
                            difficultyKey.slice(1)}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-slate-700 space-y-1">
                      <p>
                        Junior: {career.junior_salary_range}
                      </p>

                      <p>
                        Mid: {career.mid_salary_range}
                      </p>

                      <p>
                        Senior: {career.senior_salary_range}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}