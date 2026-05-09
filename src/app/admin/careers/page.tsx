'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Career = {
  id: string
  title: string
}

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([])

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await fetch(
        '/api/admin/careers'
      )

      const data = await response.json()

      setCareers(data)
    }

    fetchCareers()
  }, [])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        padding: '40px',
        position: 'relative',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#ffffff',
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
              color: '#000000',
              margin: 0,
            }}
          >
            Careers
          </h1>

          <Link
            href="/admin/careers/new"
            style={{
              background: '#2563eb',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Create Career
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {careers.map((career) => (
            <div
              key={career.id}
              style={{
                border:
                  '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                background: '#ffffff',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
              }}
            >
              <Link
                href={`/admin/careers/${career.id}`}
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000000',
                  textDecoration: 'none',
                }}
              >
                {career.title}
              </Link>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <Link
                  href={`/admin/careers/${career.id}/edit`}
                  style={{
                    background:
                      '#2563eb',
                    color: '#ffffff',
                    padding:
                      '10px 16px',
                    borderRadius: '8px',
                    textDecoration:
                      'none',
                    fontWeight: '600',
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={async () => {
                    const confirmed =
                      confirm(
                        'Delete this career?'
                      )

                    if (!confirmed)
                      return

                    await fetch(
                      `/api/admin/careers/${career.id}`,
                      {
                        method:
                          'DELETE',
                      }
                    )

                    setCareers((prev) =>
                      prev.filter(
                        (c) =>
                          c.id !==
                          career.id
                      )
                    )
                  }}
                  style={{
                    background:
                      '#dc2626',
                    color: '#ffffff',
                    padding:
                      '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
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