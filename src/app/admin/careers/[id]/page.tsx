'use client'

import Link from 'next/link'

import {
  useEffect,
  useState,
} from 'react'

import {
  useParams,
  useRouter,
} from 'next/navigation'

export default function CareerDetailsPage() {
  const params = useParams()

  const router = useRouter()

  const [career, setCareer] =
    useState<any>(null)

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await fetch(
        `/api/admin/careers/${params.id}`
      )

      const data = await response.json()

      setCareer(data)
    }

    fetchCareer()
  }, [params.id])

  const handleDelete = async () => {
    const confirmed = confirm(
      'Delete this career?'
    )

    if (!confirmed) return

    await fetch(
      `/api/admin/careers/${params.id}`,
      {
        method: 'DELETE',
      }
    )

    router.push('/admin/careers')
  }

  if (!career) {
    return (
      <div className="mt-24 p-6">
        Loading...
      </div>
    )
  }

  return (
    <div className="relative z-10 mt-24 px-4 pb-20">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href={`/admin/careers/${params.id}/edit`}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
          >
            Edit Career
          </Link>

          <button
            onClick={handleDelete}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Delete Career
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Title
            </h2>

            <p className="text-lg text-black">
              {career.title}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Slug
            </h2>

            <p className="text-black">
              {career.slug}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Short Description
            </h2>

            <p className="text-black">
              {career.short_description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Full Description
            </h2>

            <p className="whitespace-pre-wrap text-black">
              {career.full_description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Junior Salary
              </h2>

              <p>{career.junior_salary_range}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Mid Salary
              </h2>

              <p>{career.mid_salary_range}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Senior Salary
              </h2>

              <p>{career.senior_salary_range}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Demand
              </h2>

              <p>{career.demand}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Difficulty
              </h2>

              <p>{career.difficulty_level}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Duration
              </h2>

              <p>{career.duration_estimate}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Image URL
            </h2>

            <p className="break-all text-blue-600">
              {career.image_url}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Featured
            </h2>

            <p>
              {career.featured
                ? 'Yes'
                : 'No'}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Category ID
            </h2>

            <p>{career.category_id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}