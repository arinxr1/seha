export type NavKey = 'dashboard' | 'appointments' | 'triage' | 'centers'

export const dailyVisitors = [
  { day: 'السبت', visitors: 182, booked: 120 },
  { day: 'الأحد', visitors: 264, booked: 190 },
  { day: 'الاثنين', visitors: 231, booked: 168 },
  { day: 'الثلاثاء', visitors: 298, booked: 240 },
  { day: 'الأربعاء', visitors: 254, booked: 205 },
  { day: 'الخميس', visitors: 312, booked: 268 },
  { day: 'الجمعة', visitors: 143, booked: 110 },
]

export const appointmentStatus = [
  { status: 'مكتملة', value: 642, key: 'completed' },
  { status: 'محجوزة', value: 318, key: 'booked' },
  { status: 'قيد الانتظار', value: 96, key: 'waiting' },
  { status: 'ملغاة', value: 44, key: 'cancelled' },
]

export const waitTimeTrend = [
  { week: 'الأسبوع 1', before: 58, after: 42 },
  { week: 'الأسبوع 2', before: 55, after: 33 },
  { week: 'الأسبوع 3', before: 60, after: 24 },
  { week: 'الأسبوع 4', before: 52, after: 16 },
  { week: 'الأسبوع 5', before: 57, after: 13 },
]

export const hourlyLoad = [
  { hour: '8 ص', load: 34 },
  { hour: '10 ص', load: 72 },
  { hour: '12 م', load: 91 },
  { hour: '2 م', load: 58 },
  { hour: '4 م', load: 80 },
  { hour: '6 م', load: 46 },
]

export type Center = {
  id: string
  name: string
  district: string
  distanceKm: number
  waitMinutes: number
  occupancy: number
  open: boolean
}

export const centers: Center[] = [
  { id: 'c1', name: 'مركز حي النرجس الصحي', district: 'النرجس', distanceKm: 1.2, waitMinutes: 42, occupancy: 88, open: true },
  { id: 'c2', name: 'مركز حي الياسمين الصحي', district: 'الياسمين', distanceKm: 2.6, waitMinutes: 12, occupancy: 34, open: true },
  { id: 'c3', name: 'مركز حي الملقا الصحي', district: 'الملقا', distanceKm: 3.4, waitMinutes: 18, occupancy: 47, open: true },
  { id: 'c4', name: 'مركز حي العقيق الصحي', district: 'العقيق', distanceKm: 4.1, waitMinutes: 8, occupancy: 22, open: true },
  { id: 'c5', name: 'مركز حي الصحافة الصحي', district: 'الصحافة', distanceKm: 5.0, waitMinutes: 55, occupancy: 94, open: false },
]

export type Appointment = {
  id: string
  name: string
  center: string
  time: string
  service: string
  status: 'مكتملة' | 'محجوزة' | 'قيد الانتظار'
  queue: number
}

export const appointments: Appointment[] = [
  { id: 'A-1042', name: 'سارة العتيبي', center: 'حي الياسمين', time: '09:30', service: 'تطعيمات', status: 'محجوزة', queue: 3 },
  { id: 'A-1043', name: 'خالد الدوسري', center: 'حي النرجس', time: '09:45', service: 'كشف عام', status: 'قيد الانتظار', queue: 7 },
  { id: 'A-1044', name: 'نورة القحطاني', center: 'حي الملقا', time: '10:00', service: 'متابعة سكري', status: 'محجوزة', queue: 4 },
  { id: 'A-1045', name: 'عبدالله الشهري', center: 'حي العقيق', time: '10:15', service: 'أشعة', status: 'مكتملة', queue: 0 },
  { id: 'A-1046', name: 'ريم الغامدي', center: 'حي الياسمين', time: '10:30', service: 'تطعيمات', status: 'قيد الانتظار', queue: 9 },
]

export const services = ['كشف عام', 'تطعيمات', 'متابعة أمراض مزمنة', 'أشعة وتحاليل', 'طب أسنان', 'رعاية أمومة وطفولة']

export type Symptom = {
  id: string
  label: string
  weight: number
  emergency?: boolean
}

export const symptoms: Symptom[] = [
  { id: 's1', label: 'ألم شديد في الصدر', weight: 5, emergency: true },
  { id: 's2', label: 'صعوبة في التنفس', weight: 5, emergency: true },
  { id: 's3', label: 'نزيف لا يتوقف', weight: 5, emergency: true },
  { id: 's4', label: 'حرارة مرتفعة (39° فأكثر)', weight: 3 },
  { id: 's5', label: 'صداع مستمر', weight: 2 },
  { id: 's6', label: 'سعال وأعراض زكام', weight: 1 },
  { id: 's7', label: 'ألم في المفاصل', weight: 1 },
  { id: 's8', label: 'دوخة أو إغماء', weight: 3 },
  { id: 's9', label: 'غثيان أو قيء', weight: 2 },
]
