// src/components/career-form.tsx

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

import {
  careerSchema,
  type CareerFormData,
} from '@/lib/validations'

import type { Career, Category } from '@/lib/types'

interface Props {
  categories: Category[]
  existing?: Career
}

export function CareerForm({
  categories,
  existing,
}: Props) {
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
      slug: existing?.slug ?? '',
      short_description:
        existing?.short_description ?? '',
      full_description:
        existing?.full_description ?? '',

      junior_salary_range:
        existing?.junior_salary_range ?? '',

      mid_salary_range:
        existing?.mid_salary_range ?? '',

      senior_salary_range:
        existing?.senior_salary_range ?? '',

      demand:
        (existing?.demand as CareerFormData['demand']) ??
        undefined,

      difficulty_level:
        (
          existing?.difficulty_level as CareerFormData['difficulty_level']
        ) ?? undefined,

      duration_estimate:
        existing?.duration_estimate ?? '',

      image_url: existing?.image_url ?? '',

      featured: existing?.featured ?? false,

      category_id: existing?.category_id ?? '',
    },
  })

  const selectedDemand = watch('demand')

  const selectedDifficulty =
    watch('difficulty_level')

  async function onSubmit(data: CareerFormData) {
    try {
      const url = isEdit
        ? `/api/admin/careers/${existing!.id}`
        : '/api/admin/careers'

      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json?.error ?? 'Failed to save career')
        return
      }

      toast.success(
        isEdit
          ? 'Career updated successfully'
          : 'Career created successfully'
      )

      router.push('/admin/careers')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl"
    >
      <div className="space-y-2">
        <Label>Title</Label>
        <Input {...register('title')} />
        {errors.title && (
          <p className="text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Slug</Label>
        <Input {...register('slug')} />
        {errors.slug && (
          <p className="text-sm text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Short Description</Label>
        <Textarea
          rows={3}
          {...register('short_description')}
        />
        {errors.short_description && (
          <p className="text-sm text-red-500">
            {errors.short_description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Full Description</Label>
        <Textarea
          rows={8}
          {...register('full_description')}
        />
        {errors.full_description && (
          <p className="text-sm text-red-500">
            {errors.full_description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Junior Salary</Label>
          <Input
            {...register('junior_salary_range')}
          />
        </div>

        <div>
          <Label>Mid Salary</Label>
          <Input
            {...register('mid_salary_range')}
          />
        </div>

        <div>
          <Label>Senior Salary</Label>
          <Input
            {...register('senior_salary_range')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Demand</Label>

        <Select
          value={selectedDemand}
          onValueChange={(value) =>
            setValue(
              'demand',
              value as CareerFormData['demand'],
              {
                shouldValidate: true,
              }
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select demand" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="High">
              High
            </SelectItem>

            <SelectItem value="Medium">
              Medium
            </SelectItem>

            <SelectItem value="Low">
              Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Difficulty Level</Label>

        <Select
          value={selectedDifficulty}
          onValueChange={(value) =>
            setValue(
              'difficulty_level',
              value as CareerFormData['difficulty_level'],
              {
                shouldValidate: true,
              }
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Beginner">
              Beginner
            </SelectItem>

            <SelectItem value="Intermediate">
              Intermediate
            </SelectItem>

            <SelectItem value="Advanced">
              Advanced
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Duration Estimate</Label>
        <Input
          {...register('duration_estimate')}
        />
      </div>

      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input {...register('image_url')} />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>

        <Select
          defaultValue={existing?.category_id}
          onValueChange={(value) =>
            setValue('category_id', value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('featured')}
        />

        <Label>Featured Career</Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button type="submit">
          {isSubmitting
            ? 'Saving...'
            : isEdit
              ? 'Update Career'
              : 'Create Career'}
        </Button>
      </div>
    </form>
  )
}