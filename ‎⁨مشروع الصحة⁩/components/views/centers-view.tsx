'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { centers } from '@/lib/data'
import { Clock, MapPin, Navigation, Sparkles, Users } from 'lucide-react'

function occupancyTone(occ: number) {
  if (occ >= 85) return { label: 'ازدحام مرتفع', tone: 'text-destructive', bar: 'bg-destructive' }
  if (occ >= 55) return { label: 'إشغال متوسط', tone: 'text-[color:var(--chart-3)]', bar: 'bg-[color:var(--chart-3)]' }
  return { label: 'متاح الآن', tone: 'text-primary', bar: 'bg-primary' }
}

export function CentersView() {
  const current = centers[0]
  const alternatives = [...centers.slice(1)]
    .filter((c) => c.open)
    .sort((a, b) => a.waitMinutes - b.waitMinutes)
  const best = alternatives[0]

  return (
    <div className="flex flex-col gap-6">
      {/* Crowding alert + recommendation */}
      <Card className="relative overflow-hidden border-primary/30 bg-card">
        <div className="pointer-events-none absolute -left-10 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />
        <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-destructive/15 text-destructive">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-destructive">ازدحام في مركزك الحالي</p>
              <h2 className="mt-1 font-display text-lg font-bold text-foreground">
                {current.name} — الإشغال {current.occupancy}%
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                متوسط الانتظار المتوقع <span className="text-foreground"><span className="font-mono">{current.waitMinutes}</span> دقيقة</span>.
                نقترح عليك مركزاً أقرب وأسرع.
              </p>
            </div>
          </div>

          {best && (
            <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-4 neon-ring">
              <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-xs text-primary">التوصية الذكية</p>
                <p className="font-display font-bold text-foreground">{best.name}</p>
                <p className="text-sm text-muted-foreground">
                  انتظار <span className="text-primary"><span className="font-mono">{best.waitMinutes}</span> د</span> · يبعد{' '}
                  <span className="text-primary"><span className="font-mono">{best.distanceKm}</span> كم</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Centers list */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-display text-xl">المراكز الصحية القريبة</CardTitle>
          <p className="text-sm text-muted-foreground">مرتبة حسب زمن الانتظار المتوقع ومستوى الإشغال</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {centers.map((c) => {
              const occ = occupancyTone(c.occupancy)
              const isBest = best && c.id === best.id
              return (
                <div
                  key={c.id}
                  className={cn(
                    'flex flex-col gap-4 rounded-2xl border p-5',
                    isBest ? 'border-primary/40 bg-primary/5' : 'border-border bg-secondary/30',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-background text-primary">
                        <MapPin className="size-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">حي {c.district}</p>
                      </div>
                    </div>
                    {isBest && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                        الأفضل الآن
                      </span>
                    )}
                    {!c.open && (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                        مغلق
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="size-4 text-primary/70" />
                      <span className="font-mono text-foreground">{c.waitMinutes}</span> دقيقة
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Navigation className="size-4 text-primary/70" />
                      <span className="font-mono text-foreground">{c.distanceKm}</span> كم
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={occ.tone}>{occ.label}</span>
                      <span className="font-mono text-muted-foreground">{c.occupancy}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background">
                      <div className={cn('h-full rounded-full', occ.bar)} style={{ width: `${c.occupancy}%` }} />
                    </div>
                  </div>

                  <Button
                    variant={isBest ? 'default' : 'secondary'}
                    disabled={!c.open}
                    className="h-10 font-semibold"
                  >
                    التحويل إلى هذا المركز
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
