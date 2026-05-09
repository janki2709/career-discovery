// src/components/save-career-button.tsx

'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { clsx } from 'clsx'

interface Props {
  careerId: string
  initialSaved?: boolean
}

export function SaveCareerButton({
  careerId,
  initialSaved = false,
}: Props) {
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (loading) return

    setLoading(true)

    try {
      // UNSAVE
      if (saved) {
        const response = await fetch(
          `/api/saved-careers/${careerId}`,
          {
            method: 'DELETE',
          }
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to unsave career')
        }

        setSaved(false)

        toast.success('Removed from saved careers')

        return
      }

      // SAVE
      const response = await fetch('/api/saved-careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          career_id: careerId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save career')
      }

      setSaved(true)

      toast.success('Career saved')
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-label={saved ? 'Unsave career' : 'Save career'}
      className={clsx(
        'h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur transition',
        saved
          ? 'text-rose-500 hover:text-rose-600'
          : 'text-slate-400 hover:text-rose-400',
        loading && 'opacity-50 cursor-not-allowed'
      )}
    >
      <Heart
        className={clsx(
          'h-4 w-4 transition',
          saved && 'fill-current'
        )}
      />
    </button>
  )
}