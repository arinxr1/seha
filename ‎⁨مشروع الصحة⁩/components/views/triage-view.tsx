'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { symptoms } from '@/lib/data'
import { AlertTriangle, Check, ShieldAlert, ShieldCheck, Stethoscope } from 'lucide-react'

type Level = {
  key: 'emergency' | 'priority' | 'routine'
  title: string
  desc: string
  tone: string
  bar: string
  icon: typeof ShieldAlert
}

const LEVELS: Record<Level['key'], Level> = {
  emergency: {
    key: 'emergency',
    title: 'حالة طارئة',
    desc: 'الأعراض تستدعي عناية عاجلة. يُرجى التوجه فوراً لأقرب طوارئ أو الاتصال بالإسعاف 997.',
    tone: 'text-destructive',
    bar: 'bg-destructive',
    icon: ShieldAlert,
  },
  priority: {
    key: 'priority',
    title: 'أولوية للطبيب',
    desc: 'يُنصح بموعد عاجل اليوم. سيتم منحك أولوية في طابور المركز الصحي.',
    tone: 'text-[color:var(--chart-3)]',
    bar: 'bg-[color:var(--chart-3)]',
    icon: AlertTriangle,
  },
  routine: {
    key: 'routine',
    title: 'حالة اعتيادية',
    desc: 'الأعراض غير طارئة. يمكنك حجز موعد اعتيادي عبر التسجيل المسبق دون قلق.',
    tone: 'text-primary',
    bar: 'bg-primary',
    icon: ShieldCheck,
  },
}

export function TriageView() {
  const [selected, setSelected] = useState<string[]>([])
  const [assessed, setAssessed] = useState(false)

  function toggle(id: string) {
    setAssessed(false)
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const result = useMemo(() => {
    const picked = symptoms.filter((s) => selected.includes(s.id))
    const hasEmergency = picked.some((s) => s.emergency)
    const score = picked.reduce((sum, s) => sum + s.weight, 0)
    let level: Level['key'] = 'routine'
    if (hasEmergency || score >= 8) level = 'emergency'
    else if (score >= 4) level = 'priority'
    const confidence = Math.min(98, 60 + score * 5)
    return { level, score, confidence }
  }, [selected])

  const level = LEVELS[result.level]
  const LevelIcon = level.icon

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Stethoscope className="size-4" />
            <span className="text-xs font-semibold">تشخيص أولي مبسّط</span>
          </div>
          <CardTitle className="font-display text-xl">ما الأعراض التي تشعر بها؟</CardTitle>
          <p className="text-sm text-muted-foreground">
            اختر الأعراض المنطبقة عليك، وسيقوم النظام بتقدير أولوية حالتك تمهيداً لتنظيم دورك.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {symptoms.map((s) => {
              const active = selected.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border p-4 text-start transition',
                    active
                      ? 'border-primary/50 bg-primary/10 neon-ring'
                      : 'border-border bg-secondary/30 hover:border-primary/30',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-6 shrink-0 place-items-center rounded-md border transition',
                      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent',
                    )}
                  >
                    <Check className="size-4" />
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-2">
                    <span className="text-sm text-foreground">{s.label}</span>
                    {s.emergency && (
                      <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                        عاجل
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          <Button
            className="mt-5 h-11 w-full font-semibold sm:w-auto"
            disabled={selected.length === 0}
            onClick={() => setAssessed(true)}
          >
            تقييم الحالة
          </Button>
        </CardContent>
      </Card>

      {/* Result */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-display text-xl">نتيجة التقييم</CardTitle>
          <p className="text-sm text-muted-foreground">تقدير أولي لا يغني عن الفحص الطبي</p>
        </CardHeader>
        <CardContent>
          {!assessed ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-14 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                <Stethoscope className="size-7" />
              </div>
              <p className="max-w-[220px] text-sm text-muted-foreground">
                اختر الأعراض ثم اضغط «تقييم الحالة» لعرض مستوى الأولوية.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className={cn('flex items-start gap-4 rounded-2xl border border-border bg-secondary/30 p-4')}>
                <div className={cn('grid size-12 shrink-0 place-items-center rounded-xl bg-background', level.tone)}>
                  <LevelIcon className="size-6" />
                </div>
                <div>
                  <p className={cn('font-display text-lg font-bold', level.tone)}>{level.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{level.desc}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">دقة الفرز الأولي</span>
                  <span className="font-mono font-semibold text-primary">{result.confidence}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
                  <div className={cn('h-full rounded-full transition-all', level.bar)} style={{ width: `${result.confidence}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">عدد الأعراض المحددة</span>
                  <span className="font-mono font-semibold text-foreground">{selected.length}</span>
                </div>
              </div>

              <Button variant="secondary" className="h-11 font-semibold">
                {result.level === 'emergency' ? 'الاتصال بالطوارئ 997' : 'حجز موعد بالأولوية المناسبة'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
