'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { clsx } from 'clsx'
import { Check } from 'lucide-react'

interface Props {
  resourceId: string
  initialCompleted?: boolean
  onToggle?: (completed: boolean) => void
}

export function ResourceProgressButton({
  resourceId,
  initialCompleted = false,
  onToggle,
}: Props) {
  const [completed, setCompleted] =
    useState(initialCompleted)

  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    if (loading) return

    setLoading(true)

    try {
      if (completed) {
        const response = await fetch(
          `/api/resource-progress?resourceId=${resourceId}`,
          {
            method: 'DELETE',
          }
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.error ||
              'Failed to update progress'
          )
        }

        setCompleted(false)

        onToggle?.(false)

        toast.success(
          'Resource marked incomplete'
        )

        return
      }

      const response = await fetch(
        '/api/resource-progress',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resourceId,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error ||
            'Failed to update progress'
        )
      }

      setCompleted(true)

      onToggle?.(true)

      toast.success(
        'Resource completed'
      )
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
      className={clsx(
        'h-7 w-7 rounded-full border flex items-center justify-center transition',
        completed
          ? 'bg-green-500 border-green-500 text-white'
          : 'border-slate-300 text-slate-400 hover:border-violet-400 hover:text-violet-500',
        loading &&
          'opacity-50 cursor-not-allowed'
      )}
    >
      <Check className="h-4 w-4" />
    </button>
  )
}