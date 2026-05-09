'use client'

import {
  useEffect,
  useState,
} from 'react'

import { useParams } from 'next/navigation'

interface Skill {
  id: string
  name: string
  description: string
}

export default function CareerSkillsPage() {
  const params = useParams()

  const [skills, setSkills] =
    useState<Skill[]>([])

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    const res = await fetch(
      '/api/admin/skills'
    )

    const data = await res.json()

    const filtered = data.filter(
      (skill: any) =>
        skill.career_id === params.id
    )

    setSkills(filtered)
  }

  return (
    <main
      style={{
        padding: '40px',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '24px',
        }}
      >
        Career Skills
      </h1>

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
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '700',
              }}
            >
              {skill.name}
            </h2>

            <p>
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}