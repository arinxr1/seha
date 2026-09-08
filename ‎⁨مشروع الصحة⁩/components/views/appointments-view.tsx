'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { appointments as seedAppointments, centers, services, type Appointment } from '@/lib/data'
import { CheckCircle2, Clock, Hash, MapPin, Sparkles, UserRound } from 'lucide-react'

const statusStyles: Record<Appointment['status'], string> = {
  مكتملة: 'bg-primary/12 text-primary',
  محجوزة: 'bg-chart-2/15 text-[color:var(--chart-2)]',
  'قيد الانتظار': 'bg-chart-3/15 text-[color:var(--chart-3)]',
}

export function AppointmentsView() {
  const [list, setList] = useState<Appointment[]>(seedAppointments)
  const [name, setName] = useState('')
  const [center, setCenter] = useState('')
  const [service, setService] = useState('')
  const [time, setTime] = useState('')
  const [confirmation, setConfirmation] = useState<Appointment | null>(null)

  const canSubmit = name && center && service && time

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    const queue = Math.floor(Math.random() * 8) + 2
    const newAppt: Appointment = {
      id: `A-${1047 + list.length}`,
      name,
      center,
      service,
      time,
      status: 'محجوزة',
      queue,
    }
    setList((prev) => [newAppt, ...prev])
    setConfirmation(newAppt)
    setName('')
    setCenter('')
    setService('')
    setTime('')
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      {/* Registration form */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-4" />
            <span className="text-xs font-semibold">تسجيل مسبق أونلاين</span>
          </div>
          <CardTitle className="font-display text-xl">احجز موعدك من المنزل</CardTitle>
          <p className="text-sm text-muted-foreground">
            سجّل بياناتك مسبقاً وستصلك إشعارات لحظية عند اقتراب دورك لتصل في الوقت المناسب.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: محمد العبدالله" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>المركز الصحي</Label>
              <Select value={center} onValueChange={setCenter}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المركز" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((c) => (
                    <SelectItem key={c.id} value={`حي ${c.district}`}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>الخدمة</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="time">وقت الموعد</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <Button type="submit" disabled={!canSubmit} className="mt-1 h-11 font-semibold">
              تأكيد الحجز المسبق
            </Button>
          </form>

          {confirmation && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">تم تأكيد حجزك بنجاح</p>
                <p className="mt-1 text-muted-foreground">
                  رقم الحجز <span className="font-mono text-primary">{confirmation.id}</span> — ترتيبك في الطابور{' '}
                  <span className="font-mono text-primary">{confirmation.queue}</span>. سنشعرك عند اقتراب دورك.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live queue */}
      <Card className="border-border bg-card">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-xl">طابور المواعيد المباشر</CardTitle>
            <p className="text-sm text-muted-foreground">آخر الحجوزات وحالتها اللحظية</p>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            تحديث مباشر
          </span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {list.map((appt) => (
              <div
                key={appt.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-secondary/30 p-4"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-background text-primary">
                  <UserRound className="size-5" />
                </div>
                <div className="min-w-[140px]">
                  <p className="font-semibold text-foreground">{appt.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{appt.id}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary/70" />
                  {appt.center}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4 text-primary/70" />
                  {appt.time}
                </div>
                <div className="ms-auto flex items-center gap-3">
                  {appt.status !== 'مكتملة' && (
                    <span className="flex items-center gap-1 rounded-lg bg-background px-2.5 py-1 text-xs text-muted-foreground">
                      <Hash className="size-3.5" />
                      دورك <span className="font-mono text-primary">{appt.queue}</span>
                    </span>
                  )}
                  <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', statusStyles[appt.status])}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
