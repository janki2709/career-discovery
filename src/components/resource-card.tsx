'use client'

import { useState } from 'react'
import Link from 'next/link'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'

import {
  Bookmark,
  ExternalLink,
} from 'lucide-react'

type Resource = {
  id: string
  title: string
  resource_type?: string
  url?: string
}

type ResourceCardProps = {
  resource: Resource
  isBookmarked?: boolean
  showBookmarkButton?: boolean
  onRemove?: () => void
}

export function ResourceCard({
  resource,
  isBookmarked = false,
  showBookmarkButton = false,
  onRemove,
}: ResourceCardProps) {
  const [bookmarked, setBookmarked] =
    useState(isBookmarked)

  const [loading, setLoading] = useState(false)

  const toggleBookmark = async () => {
    try {
      setLoading(true)

      if (bookmarked) {
        const response = await fetch(
          `/api/bookmarks/${resource.id}`,
          {
            method: 'DELETE',
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to remove bookmark'
          )
        }

        setBookmarked(false)
        onRemove?.()
      } else {
        const response = await fetch(
          '/api/bookmarks',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              resource_id: resource.id,
            }),
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to bookmark resource'
          )
        }

        setBookmarked(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800">
              {resource.title}
            </h3>

            {resource.resource_type && (
              <Badge variant="secondary">
                {resource.resource_type}
              </Badge>
            )}
          </div>

          {showBookmarkButton && (
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0"
              disabled={loading}
              onClick={toggleBookmark}
            >
              <Bookmark
                className={`h-5 w-5 ${
                  bookmarked
                    ? 'fill-current text-violet-600'
                    : 'text-slate-400'
                }`}
              />
            </Button>
          )}
        </div>

        {/* Action */}
        {resource.url && (
          <Button asChild className="w-full">
            <Link
              href={resource.url}
              target="_blank"
            >
              Open Resource

              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}