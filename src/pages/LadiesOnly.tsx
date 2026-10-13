import { CONTACT, LIME, url } from '../data'
import { ArrowUpRight, Check, Mail, Phone } from '../icons'
import { PageHero, Reveal } from './shared'

const POINTS = [
  { t: 'Women only', d: 'A coached Functional Fitness class just for the ladies.' },
  { t: 'Every level', d: 'Each workout scales to where you are today, from first class onwards.' },
  { t: 'A supportive crew', d: 'Train alongside like-minded women who push each other on.' },
]

export default function LadiesOnly() {
  return (
    <>
      <PageHero
        crumb="Ladies Only"
        image="/assets/ladies.webp"
        pos="70% 30%"
        title={
          <>
            Ladies Only <em>Functional</em> Fitness
          </>
        }
        lede="The same coached, high-energy training in a women-only class, built to get you fitter, stronger and more confident."
        action={
          <a className="btn btn-lime" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Ladies Only Functional Fitness')}`}>
            Ask about session times
          </a>
        }
      />

      <section className="section !pt-10" aria-labelledby="ladies-expect">
        <div className="wrap grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="card h-full p-7 md:p-10">
              <h2 id="ladies-expect" className="display m-0" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.05 }}>
                What to expect
              </h2>
              <ul className="m-0 mt-8 grid list-none gap-6 p-0">
                {POINTS.map((x) => (
                  <li key={x.t} className="flex gap-4">
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full"
                      style={{ background: 'rgba(137,193,63,0.18)', color: LIME }}
                    >
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <div>
                      <div className="text-[17px] font-bold text-white">{x.t}</div>
                      <p className="m-0 mt-1 text-[15.5px] leading-relaxed text-white/70">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-[28px] p-7 md:p-10" style={{ background: LIME, color: 'var(--color-ink)' }}>
              <div>
                <div className="label" style={{ fontSize: 11.5, opacity: 0.75 }}>
                  Session times
                </div>
                <h2 className="display m-0 mt-4" style={{ fontSize: 28, lineHeight: 1.05, color: 'var(--color-ink)' }}>
                  Get the current Ladies Only times
                </h2>
                <p className="m-0 mt-4 text-[15.5px] font-medium leading-relaxed" style={{ opacity: 0.82 }}>
                  Drop us an email or give us a call and we'll send you this month's sessions. Booking is essential.
                </p>
              </div>
              <div className="grid gap-3">
                <a
                  className="btn w-full"
                  style={{ background: 'var(--color-ink)', color: '#fff' }}
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Ladies Only Functional Fitness')}`}
                >
                  <Mail size={16} /> Email us
                </a>
                <a className="btn w-full" style={{ border: '1px solid rgba(17,18,20,0.35)', color: 'var(--color-ink)' }} href={`tel:${CONTACT.tel}`}>
                  <Phone size={16} /> {CONTACT.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="wrap mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 px-5 py-4 text-[14.5px] text-white/70">
            <span>Looking at membership options?</span>
            <a href={url('/packages/')} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline">
              See packages <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
