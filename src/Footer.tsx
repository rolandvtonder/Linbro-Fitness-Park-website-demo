/*
  Footer, structured after the Marlin reference: a CTA band across the top, a
  rule, the brand column beside three link columns, a legal bar, and the
  oversized wordmark fading out at the bottom.
*/

import { CONTACT, FORM_URL, LIME, OCTIV_URL, url } from './data'
import { ArrowUpRight, FileDown } from './icons'

const COLUMNS = [
  {
    head: 'Train',
    links: [
      { t: 'Class timetable', h: url('/classes/') },
      { t: 'Packages', h: url('/packages/') },
      { t: 'Coaches', h: url('/coaches/') },
      { t: 'Ladies Only', h: url('/ladies-only/') },
    ],
  },
  {
    head: 'Members',
    links: [
      { t: 'Book on Octiv', h: OCTIV_URL, ext: true },
      { t: 'Membership form', h: FORM_URL, ext: true },
      { t: 'Contact us', h: url('/contact/') },
    ],
  },
  {
    head: 'Follow',
    links: [
      { t: 'Instagram', h: CONTACT.instagram, ext: true },
      { t: 'Facebook', h: CONTACT.facebook, ext: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative px-4 md:px-6" style={{ background: '#0c0d0e' }}>
      <div
        className="mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-white/10 px-6 pt-12 pb-2 md:px-14 md:pt-14"
        style={{ background: 'linear-gradient(180deg, rgba(30,32,35,0.95) 0%, rgba(17,18,20,0.95) 100%)' }}
      >
        {/* ---- CTA band ---- */}
        <div className="flex flex-wrap items-end gap-10">
          <div className="min-w-0 flex-[1_1_460px]">
            <span className="label eyebrow">Stronger together</span>
            <h2 className="display m-0 mt-5" style={{ fontSize: 'clamp(30px, 4.4vw, 44px)', lineHeight: 1.05 }}>
              Start training,{' '}
              <span style={{ fontStyle: 'italic', fontVariationSettings: '"wdth" 125, "wght" 400', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
                your way
              </span>
            </h2>
            <p className="m-0 mt-3.5 max-w-[440px] text-[15px] leading-6 text-white/65">
              Book your first class on Octiv, or download the membership form and bring it along.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-lime" href={OCTIV_URL} target="_blank" rel="noopener">
              Book a class <ArrowUpRight size={15} />
            </a>
            <a className="btn btn-ghost" href={FORM_URL} target="_blank" rel="noopener">
              Membership form
              <span className="dot">
                <FileDown size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-11 mb-10 h-px bg-white/10" />

        {/* ---- brand + link columns ---- */}
        <div className="flex flex-wrap gap-12">
          <div className="flex-[1_1_300px]">
            <img src={url('/assets/logo-trim.png')} alt="Linbro Fitness Park" width={96} height={77} className="h-[77px] w-auto" />
            <p className="m-0 mt-5 max-w-[300px] text-[14px] leading-[22px] text-white/60">
              Functional fitness, mobility, personal training and wellness coaching, indoors and out.
            </p>
            <address className="mt-5 text-[14px] not-italic leading-[22px] text-white/60">
              {CONTACT.address.join(', ')}
              <br />
              <a className="text-white/85 underline-offset-4 hover:underline" href={`tel:${CONTACT.tel}`}>
                {CONTACT.phone}
              </a>
            </address>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.head} aria-label={col.head} className="flex-[0_1_170px]">
              <div className="label mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {col.head}
              </div>
              <ul className="m-0 list-none p-0">
                {col.links.map((l) => (
                  <li key={l.t}>
                    <a
                      href={l.h}
                      {...('ext' in l && l.ext ? { target: '_blank', rel: 'noopener' } : null)}
                      className="inline-flex min-h-[36px] items-center text-[14.5px] text-white/80 no-underline transition-colors hover:text-[var(--color-lime)]"
                    >
                      {l.t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 pb-7 text-[13px] text-white/50">
          <span>&#169; {new Date().getFullYear()} Linbro Fitness Park. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
            Booking essential: no booking, no entry
          </span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          aria-hidden="true"
          className="display select-none text-center"
          style={{
            fontSize: 'clamp(64px, 15vw, 210px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.02) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 4,
          }}
        >
          LINBRO
        </div>
      </div>
      <div className="h-6" />
    </footer>
  )
}
