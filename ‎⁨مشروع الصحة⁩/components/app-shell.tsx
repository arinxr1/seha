'use client'

import { cn } from '@/lib/utils'
import type { NavKey } from '@/lib/data'
import { Activity, Bell, CalendarPlus, LayoutDashboard, MapPin, Stethoscope } from 'lucide-react'

const NAV: { key: NavKey; label: string; icon: typeof LayoutDashboard; hint: string }[] = [
  { key: 'dashboard', label: 'لوحة البيانات', icon: LayoutDashboard, hint: 'إحصائيات المركز' },
  { key: 'appointments', label: 'التسجيل والمواعيد', icon: CalendarPlus, hint: 'تسجيل مسبق' },
  { key: 'triage', label: 'التشخيص الأولي', icon: Stethoscope, hint: 'فرز الأعراض' },
  { key: 'centers', label: 'المراكز القريبة', icon: MapPin, hint: 'بديل عند الازدحام' },
]

export function AppShell({
  active,
  onChange,
  children,
}: {
  active: NavKey
  onChange: (k: NavKey) => void
  children: React.ReactNode
}) {
  const current = NAV.find((n) => n.key === active)

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col gap-2 border-l border-border bg-sidebar/70 backdrop-blur px-4 py-6 sticky top-0 h-screen">
        <Brand />
        <nav className="mt-6 flex flex-col gap-1.5">
          {NAV.map((item) => (
            <NavButton key={item.key} item={item} active={active} onChange={onChange} />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-border bg-accent/40 p-4">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="size-4" />
            <span className="text-sm font-semibold">حالة الشبكة</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            جميع المراكز متصلة. متوسط الانتظار الحالي عبر الشبكة{' '}
            <span className="text-primary"><span className="font-mono">14</span> دقيقة</span>.
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-8">
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <div className="hidden lg:block">
            <p className="text-xs text-muted-foreground">{current?.hint}</p>
            <h1 className="font-display text-xl font-bold text-foreground">{current?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-primary"
              aria-label="الإشعارات"
            >
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pe-4 ps-1.5">
              <div className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                ص
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-foreground">منسّق المركز</p>
                <p className="text-xs text-muted-foreground">مركز حي النرجس</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="lg:hidden border-b border-border bg-background/60 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {NAV.map((item) => {
              const Icon = item.icon
              const isActive = item.key === active
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onChange(item.key)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
                    isActive
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground neon-ring">
        <Activity className="size-6" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-lg font-extrabold text-foreground text-glow">صحّة</p>
          <p className="text-xs text-muted-foreground">تنظيم مراجعي المراكز الصحية</p>
        </div>
      )}
      {compact && (
        <p className="font-display text-lg font-extrabold text-foreground">صحّة</p>
      )}
    </div>
  )
}

function NavButton({
  item,
  active,
  onChange,
}: {
  item: { key: NavKey; label: string; icon: typeof LayoutDashboard; hint: string }
  active: NavKey
  onChange: (k: NavKey) => void
}) {
  const Icon = item.icon
  const isActive = item.key === active
  return (
    <button
      type="button"
      onClick={() => onChange(item.key)}
      className={cn(
        'group flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-start transition',
        isActive
          ? 'border-primary/40 bg-primary/10 text-foreground neon-ring'
          : 'border-transparent text-muted-foreground hover:border-border hover:bg-card',
      )}
    >
      <span
        className={cn(
          'grid size-9 place-items-center rounded-xl transition',
          isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:text-primary',
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="flex flex-col">
        <span className={cn('text-sm font-semibold', isActive && 'text-primary')}>{item.label}</span>
        <span className="text-xs text-muted-foreground">{item.hint}</span>
      </span>
    </button>
  )
}
