'use client'

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { DashboardView } from '@/components/views/dashboard-view'
import { AppointmentsView } from '@/components/views/appointments-view'
import { TriageView } from '@/components/views/triage-view'
import { CentersView } from '@/components/views/centers-view'
import type { NavKey } from '@/lib/data'

export default function Page() {
  const [active, setActive] = useState<NavKey>('dashboard')

  return (
    <AppShell active={active} onChange={setActive}>
      {active === 'dashboard' && <DashboardView />}
      {active === 'appointments' && <AppointmentsView />}
      {active === 'triage' && <TriageView />}
      {active === 'centers' && <CentersView />}
    </AppShell>
  )
}
