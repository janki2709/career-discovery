'use client'

import Link from 'next/link'
import {
  useEffect,
  useState,
} from 'react'

interface Skill {
  id: string
  name: string
  slug: string
  description: string

  careers?: {
    id: string
    title: string
  }
}

export default function SkillsPage() {
  const [skills, setSkills] =
    useState<Skill[]>([])

  const fetchSkills = async () => {
    const res = await fetch(
      '/api/admin/skills'
    )

    const data = await res.json()

    setSkills(data)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      'Delete this skill?'
    )

    if (!confirmed) return

    await fetch(
      `/api/admin/skills/${id}`,
      {
        method: 'DELETE',
      }
    )

    fetchSkills()
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
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
            }}
          >
            Skills
          </h1>

          <Link
            href="/admin/skills/new"
            style={{
              background: '#2563eb',
              color: '#fff',
              padding:
                '12px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Create Skill
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '20px',
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                border:
                  '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '10px',
                }}
              >
                {skill.name}
              </h2>

              <p
                style={{
                  color: '#6b7280',
                  marginBottom: '8px',
                }}
              >
                {skill.slug}
              </p>

              <p
                style={{
                  marginBottom: '8px',
                }}
              >
                {skill.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <Link
                  href={`/admin/skills/${skill.id}/edit`}
                  style={{
                    background:
                      '#f3f4f6',
                    padding:
                      '10px 16px',
                    borderRadius:
                      '8px',
                    textDecoration:
                      'none',
                    color: '#111827',
                    fontWeight: '600',
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      skill.id
                    )
                  }
                  style={{
                    background:
                      '#dc2626',
                    color: '#fff',
                    border: 'none',
                    padding:
                      '10px 16px',
                    borderRadius:
                      '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}