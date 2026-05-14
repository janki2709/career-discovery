'use client'

import { useEffect, useState } from 'react'

interface Industry {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface Career {
  id: string
  title: string
  slug: string
}

interface Resource {
  id: string
  title: string
  url: string
  resource_type: string
  skills?: {
    name: string
  }
  career?: {
    title: string
  }
}

export default function CoursesPage() {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [resources, setResources] = useState<Resource[]>([])

  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCareer, setSelectedCareer] = useState('')

  const [loading, setLoading] = useState(false)

  const fetchData = async (
    industry?: string,
    category?: string,
    career?: string
  ) => {
    try {
      setLoading(true)

      const params = new URLSearchParams()

      if (industry) {
        params.append('industry', industry)
      }

      if (category) {
        params.append('category', category)
      }

      if (career) {
        params.append('career', career)
      }

      const response = await fetch(`/api/courses?${params.toString()}`)
      const data = await response.json()

      if (!data.success) {
        return
      }

      setIndustries(data.industries || [])
      setCategories(data.categories || [])
      setCareers(data.careers || [])
      setResources(data.resources || [])
    } catch (error) {
      console.error('[COURSES_PAGE_ERROR]', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  /**
   * Industry change
   */
  const handleIndustryChange = async (value: string) => {
    setSelectedIndustry(value)
    setSelectedCategory('')
    setSelectedCareer('')

    await fetchData(value, '', '')
  }

  /**
   * Category change
   */
  const handleCategoryChange = async (value: string) => {
    setSelectedCategory(value)
    setSelectedIndustry('')
    setSelectedCareer('')

    await fetchData('', value, '')
  }

  /**
   * Career change
   */
  const handleCareerChange = async (value: string) => {
    setSelectedCareer(value)

    await fetchData(
      selectedIndustry,
      selectedCategory,
      value
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Courses & Learning Resources
        </h1>

        <p className="mt-2 text-muted-foreground">
          Select an industry or category to explore relevant learning resources.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {/* Industry */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Industry
          </label>

          <select
            value={selectedIndustry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Industry</option>

            {industries.map((industry) => (
              <option
                key={industry.id}
                value={industry.id}
              >
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Career */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Career
          </label>

          <select
            value={selectedCareer}
            onChange={(e) => handleCareerChange(e.target.value)}
            disabled={!selectedIndustry && !selectedCategory}
            className="w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select Career</option>

            {careers.map((career) => (
              <option
                key={career.id}
                value={career.id}
              >
                {career.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources */}
      {!selectedIndustry && !selectedCategory ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">
            Select an Industry or Category
          </h2>

          <p className="mt-2 text-muted-foreground">
            Relevant courses and learning resources will appear here.
          </p>
        </div>
      ) : loading ? (
        <div>
          Loading resources...
        </div>
      ) : resources.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center">
          No learning resources found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="rounded-2xl border p-5 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {resource.title}
                </h2>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {resource.resource_type}
                </span>

                {resource.skills?.name && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {resource.skills.name}
                  </span>
                )}

                {resource.career?.title && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {resource.career.title}
                  </span>
                )}
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Open Resource
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}