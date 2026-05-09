'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useParams,
  useRouter,
} from 'next/navigation'

export default function EditCategoryPage() {
  const router = useRouter()

  const params = useParams()

  const [formData, setFormData] =
    useState({
      name: '',
      slug: '',
      description: '',
    })

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    const res = await fetch(
      `/api/admin/categories/${params.id}`
    )

    const data = await res.json()

    setFormData(data)
  }

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

    await fetch(
      `/api/admin/categories/${params.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    router.push('/admin/categories')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#fff',
        padding: '40px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
          }}
        >
          Edit Category
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            rows={6}
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Update Category
          </button>
        </form>
      </div>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '16px',
}

const buttonStyle = {
  background: '#2563eb',
  color: '#fff',
  padding: '16px',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '700',
  fontSize: '16px',
}