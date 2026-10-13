import Stage from '../Stage'
import { ArrowUpRight } from '../icons'
import { Reveal } from './shared'
import { url } from '../data'

/*
  Home: the scroll stage, then a strip of cards into each page so the scene
  ends somewhere useful rather than straight into the footer.
*/

const PAGES = [
  { t: 'Classes', d: 'The weekly timetable, coach by coach.', h: url('/classes/'), img: 'floor-sm', pos: '50% 40%' },
  { t: 'Packages', d: 'Monthly memberships from R600.', h: url('/packages/'), img: 'kit-sm', pos: '50% 30%' },
  { t: 'Coaches', d: 'Meet the team, and book one-on-one.', h: url('/coaches/'), img: 'hero-lift-sm', pos: '50% 40%' },
  { t: 'Ladies Only', d: 'Functional Fitness, women only.', h: url('/ladies-only/'), img: 'ladies-sm', pos: '60% 30%' },
  { t: 'Contact', d: 'Find us in Linbro Wedge Business Park.', h: url('/contact/'), img: 'building-front-sm', pos: '50% 50%' },
]

export default function Home() {
  return (
    <>
      <Stage />
      <section className="section" aria-labelledby="explore-title">
        <div className="wrap">
          <Reveal className="mb-10 md:mb-14">
            <span className="label eyebrow">Explore</span>
            <h2 id="explore-title" className="display h2">
              Find your <em>place</em>
            </h2>
          </Reveal>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {PAGES.map((p, i) => (
              <li key={p.h} className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : undefined}>
                <Reveal delay={i * 0.05} className="h-full">
                  <a
                    href={p.h}
                    className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[32px] border border-white/12 p-6 no-underline lg:min-h-[380px]"
                  >
                    <img
                      src={url(`/assets/${p.img}.webp`)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 -z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: p.pos }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(10,11,12,0.1) 0%, rgba(10,11,12,0.55) 45%, rgba(10,11,12,0.92) 100%)' }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-colors duration-200 group-hover:border-[var(--color-lime)] group-hover:bg-[var(--color-lime)] group-hover:text-[var(--color-ink)]"
                    >
                      <ArrowUpRight size={18} />
                    </span>
                    <span className="relative">
                      <span className="display block" style={{ fontSize: 24, lineHeight: 1.05 }}>
                        {p.t}
                      </span>
                      <span className="mt-2 block text-[14.5px] leading-snug text-white/75">{p.d}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
