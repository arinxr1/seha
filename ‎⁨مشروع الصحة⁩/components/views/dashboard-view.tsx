'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { KpiCard } from '@/components/kpi-card'
import { appointmentStatus, dailyVisitors, hourlyLoad, waitTimeTrend } from '@/lib/data'
import { CalendarCheck, Clock, TrendingDown, Users } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'

const visitorsConfig = {
  visitors: { label: 'إجمالي المراجعين', color: 'var(--chart-2)' },
  booked: { label: 'محجوز مسبقاً', color: 'var(--chart-1)' },
} satisfies ChartConfig

const statusConfig = {
  value: { label: 'المواعيد' },
  completed: { label: 'مكتملة', color: 'var(--chart-1)' },
  booked: { label: 'محجوزة', color: 'var(--chart-2)' },
  waiting: { label: 'قيد الانتظار', color: 'var(--chart-3)' },
  cancelled: { label: 'ملغاة', color: 'var(--chart-5)' },
} satisfies ChartConfig

const waitConfig = {
  before: { label: 'قبل التطبيق', color: 'var(--chart-5)' },
  after: { label: 'بعد التطبيق', color: 'var(--chart-1)' },
} satisfies ChartConfig

const loadConfig = {
  load: { label: 'نسبة الإشغال', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function DashboardView() {
  const totalAppointments = appointmentStatus.reduce((s, a) => s + a.value, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Users} label="مراجعو اليوم" value="312" delta="12%" positive />
        <KpiCard icon={CalendarCheck} label="نسبة التسجيل المسبق" value="72" unit="%" delta="9%" positive />
        <KpiCard icon={Clock} label="متوسط الانتظار" value="14" unit="دقيقة" delta="21%" positive={false} goodDown />
        <KpiCard icon={TrendingDown} label="انخفاض الازدحام" value="58" unit="%" delta="6%" positive />
      </div>

      {/* Main charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-border bg-card xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">حركة المراجعين الأسبوعية</CardTitle>
              <p className="text-sm text-muted-foreground">إجمالي المراجعين مقابل الحجز المسبق</p>
            </div>
            <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
              آخر 7 أيام
            </span>
          </CardHeader>
          <CardContent>
            <ChartContainer config={visitorsConfig} className="h-[300px] w-full">
              <BarChart data={dailyVisitors} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[6, 6, 0, 0]} maxBarSize={26} />
                <Bar dataKey="booked" fill="var(--color-booked)" radius={[6, 6, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">حالة المواعيد</CardTitle>
            <p className="text-sm text-muted-foreground">توزيع المواعيد المكتملة والمحجوزة</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-[260px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
                <Pie data={appointmentStatus} dataKey="value" nameKey="status" innerRadius={62} strokeWidth={4} stroke="var(--card)">
                  {appointmentStatus.map((entry) => (
                    <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground font-mono text-2xl font-bold">
                              {totalAppointments.toLocaleString('en-US')}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 22} className="fill-muted-foreground text-xs">
                              إجمالي المواعيد
                            </tspan>
                          </text>
                        )
                      }
                      return null
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {appointmentStatus.map((s) => (
                <div key={s.key} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--color-${s.key})` }} />
                  <span className="text-xs text-muted-foreground">{s.status}</span>
                  <span className="ms-auto font-mono text-sm text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-border bg-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">تطور زمن الانتظار</CardTitle>
            <p className="text-sm text-muted-foreground">مقارنة متوسط الانتظار (بالدقائق) قبل وبعد اعتماد التطبيق</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={waitConfig} className="h-[280px] w-full">
              <AreaChart data={waitTimeTrend} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillAfter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-after)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="var(--color-after)" stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="fillBefore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-before)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-before)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area dataKey="before" type="monotone" stroke="var(--color-before)" fill="url(#fillBefore)" strokeWidth={2} />
                <Area dataKey="after" type="monotone" stroke="var(--color-after)" fill="url(#fillAfter)" strokeWidth={2.5} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">ذروة الإشغال اليومي</CardTitle>
            <p className="text-sm text-muted-foreground">نسبة إشغال المركز خلال ساعات العمل</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={loadConfig} className="h-[280px] w-full">
              <BarChart data={hourlyLoad} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 4 }}>
                <CartesianGrid horizontal={false} strokeDasharray="4 4" stroke="var(--border)" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis type="category" dataKey="hour" tickLine={false} axisLine={false} width={44} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="load" fill="var(--color-load)" radius={6} maxBarSize={22} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
