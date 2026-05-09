'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useParams,
  useRouter,
} from 'next/navigation'

export default function EditCareerPage() {
  const params = useParams()

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  const [formData, setFormData] =
    useState<any>({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      junior_salary_range: '',
      mid_salary_range: '',
      senior_salary_range: '',
      demand: '',
      difficulty_level: '',
      duration_estimate: '',
      image_url: '',
      featured: false,
      category_id: '',
    })

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await fetch(
        `/api/admin/careers/${params.id}`
      )

      const data = await response.json()

      setFormData(data)

      setLoading(false)
    }

    fetchCareer()
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    await fetch(
      `/api/admin/careers/${params.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    router.push(
      `/admin/careers/${params.id}`
    )
  }

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        Loading...
      </div>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        padding: '40px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#ffffff',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
          }}
        >
          Edit Career
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {Object.entries(formData).map(
            ([key, value]) => (
              <div key={key}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  {key}
                </label>

                <input
                  name={key}
                  value={String(
                    value ?? ''
                  )}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </div>
            )
          )}

          <button
            type="submit"
            style={{
              background: '#2563eb',
              color: '#ffffff',
              padding: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '16px',
            }}
          >
            Update Career
          </button>
        </form>
      </div>
    </main>
  )
}