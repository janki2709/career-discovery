'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
}

export function SearchFilters({ categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const categoryId = searchParams.get('category_id') ?? ''
  const demandLevel = searchParams.get('demand_level') ?? ''

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page') // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearAll = () => {
    router.push(pathname)
  }

  const hasFilters = search || categoryId || demandLevel

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search careers..."
          defaultValue={search}
          className="pl-9"
          onChange={(e) => {
            const val = e.target.value
            const timer = setTimeout(() => updateParam('search', val), 400)
            return () => clearTimeout(timer)
          }}
        />
      </div>

      {/* Category */}
      <Select
        value={categoryId || 'all'}
        onValueChange={(val) => updateParam('category_id', val === 'all' ? '' : val)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Demand level */}
      <Select
        value={demandLevel || 'all'}
        onValueChange={(val) => updateParam('demand_level', val === 'all' ? '' : val)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Demand level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          <SelectItem value="high">High Demand</SelectItem>
          <SelectItem value="medium">Medium Demand</SelectItem>
          <SelectItem value="low">Low Demand</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" size="icon" onClick={clearAll} className="shrink-0" aria-label="Clear filters">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}