'use client'

import {
  useEffect,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

interface Career {
  id: string
  title: string
}

export default function NewSkillPage() {
  const router = useRouter()

  const [careers, setCareers] =
    useState<Career[]>([])

  const [formData, setFormData] =
    useState({
      name: '',
      slug: '',
      description: '',
      career_id: '',
    })

  useEffect(() => {
    fetchCareers()
  }, [])

const fetchCareers = async () => {
  try {
    const res = await fetch(
      '/api/careers'
    )

    const data = await res.json()

    if (Array.isArray(data)) {
      setCareers(data)
      return
    }

    if (Array.isArray(data.careers)) {
      setCareers(data.careers)
      return
    }

    if (Array.isArray(data.data)) {
      setCareers(data.data)
      return
    }

    setCareers([])
  } catch (error) {
    console.error(error)
    setCareers([])
  }
}

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
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

    await fetch('/api/admin/skills', {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(formData),
    })

    router.push('/admin/skills')
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
          Create Skill
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
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
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
            Create Skill
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