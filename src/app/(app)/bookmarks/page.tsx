// src/app/(app)/bookmarks/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ResourceCard } from '@/components/resource-card'

import { Bookmark } from 'lucide-react'

type BookmarkedResource = {
  id: string
  resource_id: string
  created_at: string
  learning_resources: any
}

export default function BookmarksPage() {
  const t0 = Date.now()

  const [bookmarkedResources, setBookmarkedResources] =
    useState<BookmarkedResource[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true)

        const t1 = Date.now()

        const response = await fetch('/api/bookmarks')

        console.log(
          `fetch /api/bookmarks: ${Date.now() - t1}ms`
        )

        if (response.status === 401) {
          window.location.href = '/login'
          return
        }

        const t2 = Date.now()

        const result = await response.json()

        console.log(
          `response.json: ${Date.now() - t2}ms`
        )

        if (!response.ok) {
          throw new Error(
            result.error ||
              'Failed to fetch bookmarked resources'
          )
        }

        setBookmarkedResources(result ?? [])
      } catch (err) {
        console.error(err)

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  const resources = bookmarkedResources
    .map((item) => item.learning_resources)
    .filter(Boolean)

  console.log(
    `bookmarks total time: ${Date.now() - t0}ms`
  )


const removeBookmark = async (resourceId: string) => {
  try {
    const response = await fetch(
      `/api/bookmarks/${resourceId}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to remove bookmark')
    }

    setBookmarkedResources((prev) =>
      prev.filter(
        (item) => item.resource_id !== resourceId
      )
    )
  } catch (err) {
    console.error(err)
  }
}


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Bookmarked Resources
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {resources.length} resource
          {resources.length !== 1 ? 's' : ''} bookmarked
        </p>
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
            <div
              key={i}
              className="h-64 rounded-xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Bookmark className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="text-base font-semibold text-slate-700">
            No bookmarked resources yet
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Browse learning resources and bookmark the ones
            you like
          </p>

          <Button
            asChild
            className="mt-4 bg-violet-600 hover:bg-violet-700"
          >
            <Link href="/resources">
              Explore Resources
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
<ResourceCard
  key={resource.id}
  resource={resource}
  isBookmarked={true}
  showBookmarkButton={true}
  onRemove={() => removeBookmark(resource.id)}
/>
          ))}
        </div>
      )}
    </div>
  )
}