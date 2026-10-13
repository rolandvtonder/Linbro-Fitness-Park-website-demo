import { useState, type KeyboardEvent } from 'react'
import { LIME, OCTIV_URL, WEEK, todayIndex, type Session } from '../data'
import { ArrowUpRight, Calendar } from '../icons'
import { PageHero, Reveal } from './shared'

/*
  Weekly timetable. Six columns on wide screens; on phones, a day tab bar
  over one day's list, opening on today.
*/

function SessionCard({ s }: { s: Session }) {
  const mobility = s.name !== 'Functional Fitness'
  return (
    <li
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors duration-200 hover:border-white/25"
      style={mobility ? { borderColor: 'rgba(137,193,63,0.45)', background: 'rgba(137,193,63,0.07)' } : undefined}
    >
      <div className="display" style={{ fontSize: 17, fontVariationSettings: '"wdth" 125, "wght" 650', fontVariantNumeric: 'tabular-nums' }}>
        {s.start}
        <span className="sr-only"> to </span>
        <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {' '}–{' '}
        </span>
        {s.end}
      </div>
      <div className="mt-2 text-[15px] font-semibold leading-snug text-white">{s.name}</div>
      <div className="mt-1 text-[13px] text-white/60">{s.coach ? `with ${s.coach}` : 'Coach TBC'}</div>
      {s.note && (
        <div className="label mt-3 inline-block rounded-full px-2.5 py-1" style={{ fontSize: 9.5, color: LIME, border: `1px solid ${LIME}` }}>
          {s.note}
        </div>
      )}
    </li>
  )
}

export default function Schedule() {
  const today = todayIndex()
  const [day, setDay] = useState(Math.max(0, today))

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 }
    let next = day
    if (e.key in keys) next = (day + keys[e.key] + WEEK.length) % WEEK.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = WEEK.length - 1
    else return
    e.preventDefault()
    setDay(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <>
      <PageHero
        crumb="Classes"
        image="/assets/floor.webp"
        pos="50% 25%"
        title={
          <>
            Find your <em>class</em>
          </>
        }
        lede="Coached Functional Fitness six days a week, early and late, plus Mobility & Stretch every second Saturday. Booking is essential."
        action={
          <a className="btn btn-lime" href={OCTIV_URL} target="_blank" rel="noopener">
            <Calendar size={16} />
            Book on Octiv
          </a>
        }
      />
      <section id="schedule" className="section !pt-10" aria-label="Weekly timetable">
        <div className="wrap">

          {/* phones: tabs */}
          <Reveal className="md:hidden">
            <div role="tablist" aria-label="Day of the week" className="mb-5 grid grid-cols-6 gap-1.5" onKeyDown={onTabKey}>
              {WEEK.map((d, i) => (
                <button
                  key={d.day}
                  id={`tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={i === day}
                  aria-controls="day-panel"
                  tabIndex={i === day ? 0 : -1}
                  onClick={() => setDay(i)}
                  className="label relative min-h-12 cursor-pointer rounded-full border px-0 transition-colors"
                  style={{
                    fontSize: 10.5,
                    background: i === day ? LIME : 'transparent',
                    color: i === day ? 'var(--color-ink)' : 'rgba(255,255,255,0.8)',
                    borderColor: i === day ? LIME : 'rgba(255,255,255,0.18)',
                  }}
                >
                  {d.short}
                  {i === today && <span className="sr-only"> (today)</span>}
                  {i === today && i !== day && (
                    <span aria-hidden="true" className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                  )}
                </button>
              ))}
            </div>
            <div id="day-panel" role="tabpanel" aria-labelledby={`tab-${day}`}>
              <ul className="m-0 grid list-none gap-3 p-0">
                {WEEK[day].sessions.map((s) => (
                  <SessionCard key={s.start + s.name} s={s} />
                ))}
              </ul>
            </div>
          </Reveal>

          {/* wide screens: the whole week */}
          <div className="hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-6">
            {WEEK.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.04}>
                <div
                  className="h-full rounded-[24px] border p-3"
                  style={{
                    borderColor: i === today ? 'rgba(137,193,63,0.55)' : 'rgba(255,255,255,0.08)',
                    background: i === today ? 'rgba(137,193,63,0.05)' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <h2 className="m-0 flex items-center justify-between px-1 pb-3 pt-1">
                    <span className="display" style={{ fontSize: 15, fontVariationSettings: '"wdth" 125, "wght" 700' }}>
                      {d.day}
                    </span>
                    {i === today && (
                      <span className="label" style={{ fontSize: 9.5, color: LIME }}>
                        Today
                      </span>
                    )}
                  </h2>
                  <ul className="m-0 grid list-none gap-2 p-0">
                    {d.sessions.map((s) => (
                      <SessionCard key={s.start + s.name} s={s} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 px-5 py-4 text-[14px] text-white/70">
              <span className="flex items-center gap-2 font-semibold text-white">
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: LIME }} />
                No booking, no entry
              </span>
              <span>Unused classes don't carry over to the next month.</span>
              <span>T's &amp; C's apply.</span>
              <a href={OCTIV_URL} target="_blank" rel="noopener" className="ml-auto inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline">
                Open the Octiv app <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
