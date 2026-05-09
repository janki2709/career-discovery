'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCareerPage() {
  const router = useRouter()

  const [formData, setFormData] =
    useState({
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    await fetch('/api/admin/careers', {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(formData),
    })

    router.push('/admin/careers')
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
          Create Career
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
                  value={String(value)}
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
            Create Career
          </button>
        </form>
      </div>
    </main>
  )
}