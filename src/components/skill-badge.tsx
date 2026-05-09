import { clsx } from 'clsx'

interface Props {
  name: string
  demandPercentage?: number
  size?: 'sm' | 'md'
}

export function SkillBadge({ name, demandPercentage, size = 'md' }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border bg-violet-50 text-violet-700 border-violet-200 font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {name}
      {demandPercentage != null && (
        <span className="text-violet-400 text-xs">{demandPercentage}%</span>
      )}
    </span>
  )
}