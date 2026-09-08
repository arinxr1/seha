import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'

export function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  delta,
  positive = true,
  goodDown = false,
}: {
  icon: LucideIcon
  label: string
  value: string
  unit?: string
  delta: string
  positive?: boolean
  goodDown?: boolean
}) {
  // goodDown: for metrics where a decrease is good (e.g. wait time)
  const isGood = goodDown ? !positive : positive
  const Arrow = positive ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="relative overflow-hidden border-border bg-card p-5">
      <div className="pointer-events-none absolute -left-8 -top-10 size-28 rounded-full bg-primary/10 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" />
        </div>
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
            isGood ? 'bg-primary/12 text-primary' : 'bg-destructive/15 text-destructive',
          )}
        >
          <Arrow className="size-3.5" />
          {delta}
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5 font-display text-3xl font-extrabold text-foreground">
        <span className="font-mono">{value}</span>
        {unit && <span className="text-base font-medium text-muted-foreground">{unit}</span>}
      </p>
    </Card>
  )
}
