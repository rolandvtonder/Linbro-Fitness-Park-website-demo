/*
  Everything the site says about the gym lives here, so the timetable, prices
  and contact details can be updated without touching layout code.
  Source: linbrofitnesspark.co.za (home, packages, schedules, contact pages).
*/

/*
  Every internal link and image goes through url(), so the site works at the
  domain root and under a sub-path (GitHub Pages serves it at
  /Linbro-Fitness-Park-website-demo/). The base comes from vite.config.ts.
*/
export const url = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const LIME = '#89c13f' // sampled from the FITNESS lettering in the logo
export const STAR = '#a2a4a6' // the logo's star

export const OCTIV_URL = 'https://app.octivfitness.com/dashboard'
export const FORM_URL =
  'https://linbrofitnesspark.co.za/wp-content/uploads/2024/09/LFP-Membership-Form-2024.pdf'

export const CONTACT = {
  address: ['Unit 9, 74 1st Road', 'Linbro Wedge Business Park', 'Linbro Park'],
  phone: '+27 72 280 3601',
  tel: '+27722803601',
  email: 'linbrofitnesspark@outlook.com',
  instagram: 'https://www.instagram.com/linbrofitness_park',
  facebook: 'https://www.facebook.com/linbrofitnesspark',
  mapQuery: 'Linbro Wedge Business Park, 74 1st Road, Linbro Park, Johannesburg',
}

export type Session = { start: string; end: string; name: string; coach?: string; note?: string }
export type Day = { day: string; short: string; sessions: Session[] }

const FF = 'Functional Fitness'
const s = (start: string, end: string, coach?: string, name = FF, note?: string): Session => ({
  start,
  end,
  name,
  coach,
  note,
})

export const WEEK: Day[] = [
  {
    day: 'Monday',
    short: 'Mon',
    sessions: [s('06:00', '07:00', 'Dyllin'), s('08:00', '09:00', 'Michelle'), s('16:00', '17:00', 'Michelle'), s('17:00', '18:00', 'Dyllin'), s('18:00', '19:00', 'Dyllin')],
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    sessions: [s('06:00', '07:00', 'Michelle'), s('07:00', '08:00', 'Michelle'), s('16:00', '17:00', 'Dyllin'), s('17:00', '18:00', 'Dyllin'), s('18:00', '19:00', 'Dyllin')],
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    sessions: [s('06:00', '07:00', 'Dyllin'), s('08:00', '09:00', 'Michelle'), s('16:00', '17:00', 'Michelle'), s('17:00', '18:00', 'Dyllin'), s('18:00', '19:00', 'Dyllin')],
  },
  {
    day: 'Thursday',
    short: 'Thu',
    sessions: [s('06:00', '07:00', 'Michelle'), s('07:00', '08:00', 'Michelle'), s('16:00', '17:00', 'Dyllin'), s('17:00', '18:00', 'Dyllin'), s('18:00', '19:00', 'Dyllin')],
  },
  {
    day: 'Friday',
    short: 'Fri',
    sessions: [s('06:00', '07:00', 'Dyllin'), s('08:00', '09:00', 'Michelle'), s('16:00', '17:00', 'Dyllin'), s('17:00', '18:00', 'Dyllin')],
  },
  {
    day: 'Saturday',
    short: 'Sat',
    sessions: [s('07:00', '08:00', undefined, 'Mobility & Stretch', 'Every 2nd Saturday'), s('08:00', '09:00', 'Dyllin')],
  },
]

export const WEEKLY_CLASSES = WEEK.reduce((n, d) => n + d.sessions.length, 0)

export const classesFor = (coach: string) =>
  WEEK.reduce((n, d) => n + d.sessions.filter((x) => x.coach === coach).length, 0)

/** Index into WEEK for today, or -1 on a Sunday. */
export const todayIndex = () => {
  const d = new Date().getDay()
  return d === 0 ? -1 : d - 1
}

export type Plan = {
  name: string
  price: number
  sessions: string
  includes: string[]
  excludes: string[]
  featured?: boolean
}

const CORE = 'Bootcamp, Functional Fitness, HIIT & Kickboxing Combo'
const EXCLUDED = ['Volleyball', 'Private one-on-one classes', 'Weightlifting & Powerlifting']

export const PLANS: Record<'individual' | 'couples', Plan[]> = {
  individual: [
    { name: 'Bronze', price: 600, sessions: '8 sessions a month', includes: [CORE], excludes: [] },
    { name: 'Unlimited', price: 750, sessions: 'Unlimited sessions', includes: [CORE], excludes: EXCLUDED, featured: true },
  ],
  couples: [
    { name: 'Bronze', price: 1050, sessions: '8 sessions a month', includes: [CORE], excludes: [] },
    {
      name: 'Unlimited',
      price: 1300,
      sessions: 'Unlimited sessions',
      includes: [CORE, 'Open Gym'],
      excludes: EXCLUDED,
      featured: true,
    },
  ],
}

export const NAV = [
  { t: 'Classes', h: url('/classes/') },
  { t: 'Packages', h: url('/packages/') },
  { t: 'Coaches', h: url('/coaches/') },
  { t: 'Ladies Only', h: url('/ladies-only/') },
  { t: 'Contact', h: url('/contact/') },
]
