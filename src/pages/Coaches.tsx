import { CONTACT, LIME, classesFor, url } from '../data'
import { ArrowUpRight, Star } from '../icons'
import { PageHero, Reveal } from './shared'

/*
  Coaches. Portraits are placeholders (the logo's star with an initial)
  until real photos are supplied: set `photo` to e.g. '/assets/coach-dyllin.webp'
  and the card switches to the image.
*/

type Coach = { name: string; role: string; photo?: string; slots: string; focus: string[] }

const COACHES: Coach[] = [
  {
    name: 'Dyllin',
    role: 'Functional Fitness Coach',
    slots: 'Early mornings, weekday evenings and Saturday 08:00',
    focus: ['Functional Fitness', 'Evening sessions', 'Saturday class'],
  },
  {
    name: 'Michelle',
    role: 'Functional Fitness Coach',
    slots: 'Early and mid-mornings, plus 16:00 on Mondays & Wednesdays',
    focus: ['Functional Fitness', 'Morning sessions', 'Afternoon class'],
  },
]

function Portrait({ c }: { c: Coach }) {
  if (c.photo) {
    return <img src={url(c.photo)} alt={`${c.name}, ${c.role}`} loading="lazy" className="h-full w-full object-cover" />
  }
  return (
    <div
      className="relative grid h-full w-full place-items-center overflow-hidden"
      style={{ background: 'radial-gradient(120% 90% at 30% 10%, #2a2c30 0%, #17181b 70%)' }}
      aria-hidden="true"
    >
      <Star size={340} className="absolute -right-16 -bottom-14" style={{ color: 'rgba(162,164,166,0.12)' }} />
      <span className="display relative" style={{ fontSize: 132, color: LIME, lineHeight: 1 }}>
        {c.name[0]}
      </span>
    </div>
  )
}

export default function Coaches() {
  return (
    <>
      <PageHero
        crumb="Coaches"
        image="/assets/hero-lift.webp"
        pos="50% 40%"
        title={
          <>
            Coached, <em>every</em> session
          </>
        }
        lede="Every class has an expert coach guiding your form, pace and progress, whether it's your first session or your hundredth."
        action={
          <a className="btn btn-white" href={url('/classes/')}>
            See who's coaching when
          </a>
        }
      />
      <section id="coaches" className="section !pt-10" aria-label="Our coaches">
        <div className="wrap">

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {COACHES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <article className="card group h-full overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Portrait c={c} />
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="display m-0" style={{ fontSize: 28 }}>
                          {c.name}
                        </h2>
                        <div className="label mt-2.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {c.role}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="display" style={{ fontSize: 30, color: LIME, fontVariationSettings: '"wdth" 125, "wght" 500' }}>
                          {classesFor(c.name)}
                        </div>
                        <div className="label mt-1" style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.5)' }}>
                          Classes / wk
                        </div>
                      </div>
                    </div>
                    <p className="m-0 mt-5 text-[15px] leading-relaxed text-white/70">{c.slots}.</p>
                    <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                      {c.focus.map((f) => (
                        <li key={f} className="rounded-full border border-white/12 px-3 py-1.5 text-[12.5px] text-white/75">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* one-on-one coaching */}
            <Reveal delay={0.12} className="md:col-span-2 lg:col-span-1">
              <article
                className="flex h-full flex-col justify-between gap-10 rounded-[28px] p-8"
                style={{ background: LIME, color: 'var(--color-ink)' }}
              >
                <div>
                  <div className="label" style={{ fontSize: 11.5, opacity: 0.75 }}>
                    One-on-one
                  </div>
                  <h2 className="display m-0 mt-4" style={{ fontSize: 25, color: 'var(--color-ink)', lineHeight: 1.08 }}>
                    Personal training, nutrition &amp; wellness coaching
                  </h2>
                  <p className="m-0 mt-5 text-[15.5px] font-medium leading-relaxed" style={{ opacity: 0.82 }}>
                    Want a plan built around you? We'll match you with a coach for personal training, nutrition coaching or
                    health &amp; wellness coaching.
                  </p>
                </div>
                <a
                  className="btn w-full"
                  style={{ background: 'var(--color-ink)', color: '#fff' }}
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Personal training enquiry')}`}
                >
                  Ask about one-on-one <ArrowUpRight size={16} />
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
