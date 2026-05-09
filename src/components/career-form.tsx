'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { careerSchema, type CareerFormData } from '@/lib/validations'
import type { Career, Category } from '@/lib/types'

interface Props {
  categories: Category[]
  existing?: Career
}

export function CareerForm({ categories, existing }: Props) {
  const router = useRouter()
  const isEdit = !!existing

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: existing?.title ?? '',
      description: existing?.description ?? '',
      category_id: existing?.category_id ?? '',
      demand_level: existing?.demand_level ?? undefined,
      avg_salary: existing?.avg_salary ?? undefined,
    },
  })

  const onSubmit = async (data: CareerFormData) => {
    const url = isEdit ? `/api/careers/${existing!.id}` : '/api/careers'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const json = await res.json()
      toast.error(json?.error ?? 'Failed to save career.')
      return
    }

    const career = await res.json()
    toast.success(isEdit ? 'Career updated' : 'Career created')
    router.push(`/careers/${career.id}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="e.g. Data Analyst" {...register('title')} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this career involves..."
          rows={5}
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      {/* Category */}
      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          defaultValue={existing?.category_id}
          onValueChange={(val) => setValue('category_id', val, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>}
      </div>

      {/* Demand level */}
      <div className="space-y-1">
        <Label>Demand level</Label>
        <Select
          defaultValue={existing?.demand_level}
          onValueChange={(val) =>
            setValue('demand_level', val as CareerFormData['demand_level'], { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select demand level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        {errors.demand_level && <p className="text-sm text-red-500">{errors.demand_level.message}</p>}
      </div>

      {/* Salary */}
      <div className="space-y-1">
        <Label htmlFor="avg_salary">Average salary (USD)</Label>
        <Input
          id="avg_salary"
          type="number"
          placeholder="e.g. 95000"
          {...register('avg_salary', { valueAsNumber: true })}
        />
        {errors.avg_salary && <p className="text-sm text-red-500">{errors.avg_salary.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-violet-600 hover:bg-violet-700" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Career' : 'Create Career'}
        </Button>
      </div>
    </form>
  )
}