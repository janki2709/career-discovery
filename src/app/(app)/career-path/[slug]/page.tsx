// src/app/(app)/career-path/[slug]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import CareerPathTimeline from '@/components/career-path-timeline'

import {
  Career,
  CareerPathResponse,
  CareerPathStep
} from '@/lib/types'

export default function CareerPathPage() {
  const params = useParams()

  const slug = params.slug as string

  const [career, setCareer] = useState<Career | null>(null)

  const [steps, setSteps] = useState<CareerPathStep[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {
    fetchCareerPath()
  }, [])

  async function fetchCareerPath() {
    try {
      console.log(
        `[CAREER_PATH_PAGE_FETCH_START] slug=${slug}`
      )

      setLoading(true)

      const response = await fetch(
        `/api/career-path/${slug}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch career path')
      }

      const data: CareerPathResponse =
        await response.json()

      setCareer(data.career)

      setSteps(data.steps)

      console.log(
        `[CAREER_PATH_PAGE_FETCH_SUCCESS] slug=${slug} totalSteps=${data.steps.length}`
      )
    } catch (error) {
      console.error(
        '[CAREER_PATH_PAGE_FETCH_ERROR]',
        error
      )

      setError('Unable to load career path')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>Loading career path...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    )
  }

  if (!career) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>Career not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-gray-500 mb-3">
          Career Roadmap
        </p>

        <h1 className="text-5xl font-bold mb-4">
          {career.title}
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl leading-8">
          {career.short_description}
        </p>
      </div>

      {/* Timeline */}
      <CareerPathTimeline steps={steps} />
    </div>
  )
}