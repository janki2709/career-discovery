// src/components/career-path-timeline.tsx

import { CareerPathStep } from '@/lib/types'

interface Props {
  steps: CareerPathStep[]
}

export default function CareerPathTimeline({
  steps
}: Props) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="relative border rounded-2xl p-6 bg-white shadow-sm"
        >
          {/* Timeline line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-10 top-20 w-[2px] h-16 bg-gray-200" />
          )}

          <div className="flex gap-4">
            {/* Step number */}
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
              {step.step_order}
            </div>

            <div className="flex-1">
              {/* Stage */}
              <div className="mb-2">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {step.stage_type.replace('_', ' ')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">
                {step.title}
              </h2>

              {/* Description */}
              <p className="text-gray-700 leading-7 mb-6">
                {step.description}
              </p>

              {/* Metadata */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Duration
                  </p>

                  <p className="font-medium">
                    {step.duration}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Requirements
                  </p>

                  <p className="font-medium">
                    {step.requirements}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Outcome
                  </p>

                  <p className="font-medium">
                    {step.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}