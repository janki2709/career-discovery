// src/app/(app)/career-path/page.tsx

'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

import { Search, Route } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Industry {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface CareerPathCard {
  id: string
  title: string
  slug: string
  short_description: string
  duration_estimate: string | null
  difficulty_level: string
  demand: string
  total_steps: number
  category?: Category
  industries: Industry[]
}

export default function CareerPathPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)

  const [careers, setCareers] = useState<CareerPathCard[]>([])
  const [industries, setIndustries] = useState<Industry[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [industry, setIndustry] = useState(
    searchParams.get('industry') || 'all'
  )
  const [category, setCategory] = useState(
    searchParams.get('category') || 'all'
  )

  const fetchCareerPaths = useCallback(async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams()
      if (search) {
        params.set('search', search)
      }

      if (industry !== 'all') {
        params.set('industry', industry)
      }

      if (category !== 'all') {
        params.set('category', category)
      }

      const response = await fetch(
        `/api/career-path?${params.toString()}`
      )

      const data = await response.json()

      setCareers(data.careers || [])
      setIndustries(data.industries || [])
      setCategories(data.categories || [])

      router.replace(`/career-path?${params.toString()}`)
    } catch (error) {
      console.error('[CAREER_PATH_PAGE_ERROR]', error)
    } finally {
      setLoading(false)
    }  
}, [search, industry, category, router])

  useEffect(() => {
    fetchCareerPaths()
  }, [fetchCareerPaths])

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          Career Paths
        </h1>

        <p className='mt-2 text-muted-foreground'>
          Explore structured roadmaps for different careers.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <div className='relative md:col-span-1'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />

          <Input
            placeholder='Search career paths...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='pl-10'
          />
        </div>

        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by industry' />
          </SelectTrigger>
         <SelectContent>
            <SelectItem value='all'>All Industries</SelectItem>

            {industries.map((item) => (
              <SelectItem key={item.id} value={item.slug}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by category' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item.id} value={item.slug}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <div className='h-6 w-2/3 animate-pulse rounded bg-muted' />
                  <div className='h-4 w-full animate-pulse rounded bg-muted' />
                  <div className='h-4 w-5/6 animate-pulse rounded bg-muted' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : careers.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-14 text-center'>
            <Route className='mb-4 h-10 w-10 text-muted-foreground' />

            <h2 className='text-xl font-semibold'>
              No career paths found
            </h2>

            <p className='mt-2 text-muted-foreground'>
              Try adjusting your search or filters.
            </p>
          </CardContent>
        </Card>
      ) : (

        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {careers.map((career) => (
            <Card
              key={career.id}
              className='transition-all hover:-translate-y-1 hover:shadow-lg'
            >
              <CardContent className='space-y-4 p-6'>
                <div className='space-y-2'>
                  <Link
                    href={`/career-path/${career.slug}`}
                    className='text-xl font-semibold transition-colors hover:text-primary'
                  >
                    {career.title}
                  </Link>

                  <p className='line-clamp-3 text-sm text-muted-foreground'>
                    {career.short_description}
                  </p>
                </div>

                <div className='space-y-2 text-sm'>
                  {career.category && (
                    <div>
                      <span className='font-medium'>Category:</span>{' '}
                      {career.category.name}
                    </div>
                  )}

                  <div>
                    <span className='font-medium'>Difficulty:</span>{' '}
                    {career.difficulty_level}
                  </div>


                  <div>
                    <span className='font-medium'>Demand:</span>{' '}
                    {career.demand}
                  </div>

                  {career.duration_estimate && (
                    <div>
                      <span className='font-medium'>Estimated Time:</span>{' '}
                      {career.duration_estimate}
                    </div>
                  )}

                  <div>
                    <span className='font-medium'>Career Path Steps:</span>{' '}
                    {career.total_steps}
                  </div>
                </div>

                {career.industries.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {career.industries.map((industry) => (
                      <div
                        key={industry.id}
                        className='rounded-full bg-muted px-3 py-1 text-xs'
                      >
                        {industry.name}
                      </div>
                    ))}
                  </div>
                )}

<div className="grid grid-cols-2 gap-2">
  <Button asChild variant="outline">
    <Link href={`/careers/${career.id}`}>
      View Career
    </Link>
  </Button>

  <Button asChild>
    <Link href={`/career-path/${career.slug}`}>
      View Career Path
    </Link>
  </Button>
</div>

              </CardContent>
            </Card>
          ))}   
        </div>
      )}
    </div>
  )
}