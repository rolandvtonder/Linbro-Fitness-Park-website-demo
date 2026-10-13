import { useState } from 'react'
import { FORM_URL, LIME, PLANS, type Plan } from '../data'
import { Check, FileDown, Minus } from '../icons'
import { PageHero, Reveal } from './shared'

type Who = keyof typeof PLANS

function PlanCard({ plan, who }: { plan: Plan; who: Who }) {
  const f = plan.featured
  return (
    <article
      className="relative flex h-full flex-col rounded-[32px] border p-7 md:p-9"
      style={{
        borderColor: f ? LIME : 'rgba(255,255,255,0.1)',
        background: f
          ? 'linear-gradient(170deg, rgba(137,193,63,0.14) 0%, rgba(23,24,27,0.95) 46%)'
          : 'linear-gradient(180deg, rgba(34,36,40,0.9) 0%, rgba(23,24,27,0.9) 100%)',
        boxShadow: f ? '0 30px 80px -40px rgba(137,193,63,0.45)' : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label" style={{ color: f ? LIME : 'rgba(255,255,255,0.6)', fontSize: 11.5 }}>
            {who === 'couples' ? 'Couples' : 'Individual'}
          </div>
          <h2 className="display m-0 mt-3" style={{ fontSize: 30 }}>
            {plan.name}
          </h2>
        </div>
        {f && (
          <span className="label shrink-0 whitespace-nowrap rounded-full px-3 py-1.5" style={{ background: LIME, color: 'var(--color-ink)', fontSize: 10 }}>
            No limits
          </span>
        )}
      </div>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="display" style={{ fontSize: 56, lineHeight: 1, fontVariationSettings: '"wdth" 125, "wght" 300', fontVariantNumeric: 'tabular-nums' }}>
          R{plan.price.toLocaleString('en-ZA')}
        </span>
        <span className="text-[15px] text-white/60">/ month</span>
      </div>
      <p className="m-0 mt-3 text-[15px] font-semibold text-white">{plan.sessions}</p>

      <div className="my-7 h-px bg-white/10" />

      <ul className="m-0 grid list-none gap-3 p-0 text-[15px] leading-snug">
        {plan.includes.map((x) => (
          <li key={x} className="flex gap-3 text-white/90">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: 'rgba(137,193,63,0.18)', color: LIME }}>
              <Check size={13} strokeWidth={3} />
            </span>
            <span>
              <span className="sr-only">Included: </span>
              {x}
            </span>
          </li>
        ))}
        {plan.excludes.map((x) => (
          <li key={x} className="flex gap-3 text-white/50">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/5">
              <Minus size={13} strokeWidth={3} />
            </span>
            <span>
              <span className="sr-only">Not included: </span>
              {x}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <a
          className={`btn ${f ? 'btn-lime' : 'btn-white'} w-full`}
          href={FORM_URL}
          target="_blank"
          rel="noopener"
          aria-label={`Join ${who === 'couples' ? 'Couples' : 'Individual'} ${plan.name} — membership form (PDF)`}
        >
          Join now
          <FileDown size={16} />
        </a>
      </div>
    </article>
  )
}

export default function Packages() {
  const [who, setWho] = useState<Who>('individual')
  return (
    <>
      <PageHero
        crumb="Packages"
        image="/assets/kit.webp"
        pos="50% 15%"
        title={
          <>
            Simple monthly <em>memberships</em>
          </>
        }
        lede="Pick a pace that suits you: eight sessions a month, or as many as you like. Every package covers Bootcamp, Functional Fitness, HIIT and Kickboxing Combo."
        action={
          <a className="btn btn-white" href={FORM_URL} target="_blank" rel="noopener">
            Membership form
            <FileDown size={16} />
          </a>
        }
      />
      <section id="packages" className="section !pt-10" aria-label="Membership packages">
        <div className="wrap">
          <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <p className="m-0 text-[15px] text-white/70">Prices are per month. Choose who's training:</p>
            <div role="group" aria-label="Membership type" className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1">
              {(['individual', 'couples'] as Who[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={who === k}
                  onClick={() => setWho(k)}
                  className="label min-h-11 cursor-pointer rounded-full px-5 transition-colors duration-200"
                  style={{
                    fontSize: 11.5,
                    background: who === k ? '#fff' : 'transparent',
                    color: who === k ? 'var(--color-ink)' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  {k === 'individual' ? 'Individual' : 'Couples'}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {PLANS[who].map((plan, i) => (
              <Reveal key={who + plan.name} delay={i * 0.06}>
                <PlanCard plan={plan} who={who} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-8 gap-y-2 p-0 text-[14px] text-white/60">
              {who === 'couples' && <li>Couples packages are for spouses only.</li>}
              <li>Booking is essential for all classes.</li>
              <li>Unused classes don't carry over.</li>
              <li>T's &amp; C's apply.</li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
