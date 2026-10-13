import type { ReactNode } from 'react'
import { CONTACT, LIME } from '../data'
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from '../icons'
import { PageHero, Reveal } from './shared'

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`
const embed = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&z=15&output=embed`

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: 'rgba(137,193,63,0.14)', color: LIME }}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {label}
        </div>
        <div className="mt-2 text-[16px] leading-relaxed text-white">{children}</div>
      </div>
    </div>
  )
}

const link = 'inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-[var(--color-lime)] '

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact"
        image="/assets/building-front.webp"
        pos="50% 55%"
        title={
          <>
            Come train <em>with us</em>
          </>
        }
        lede="Questions about classes, packages or one-on-one coaching? Call, email or drop by. We're in Linbro Wedge Business Park."
        action={
          <>
            <a className="btn btn-lime" href={`tel:${CONTACT.tel}`}>
              <Phone size={16} /> Call us
            </a>
            <a className="btn btn-ghost" href={directions} target="_blank" rel="noopener">
              Get directions
              <span className="dot">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </>
        }
      />
      <section id="contact" className="section !pt-10" aria-label="Contact details and map">
        <div className="wrap">

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="card h-full p-7 md:p-9">
                <Row icon={<MapPin size={19} />} label="Visit">
                  <address className="not-italic">
                    {CONTACT.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a className={link} href={directions} target="_blank" rel="noopener">
                    Get directions <ArrowUpRight size={15} />
                  </a>
                </Row>
                <Row icon={<Phone size={18} />} label="Call">
                  <a className={link} href={`tel:${CONTACT.tel}`}>
                    {CONTACT.phone}
                  </a>
                </Row>
                <Row icon={<Mail size={18} />} label="Email">
                  <a className={link} href={`mailto:${CONTACT.email}`}>
                    {/* break after the @ rather than mid-word on narrow phones */}
                    {CONTACT.email.split('@')[0]}@<wbr />
                    {CONTACT.email.split('@')[1]}
                  </a>
                </Row>
                <Row icon={<Instagram size={18} />} label="Follow">
                  <div className="flex flex-wrap gap-x-6">
                    <a className={link} href={CONTACT.instagram} target="_blank" rel="noopener">
                      <Instagram size={16} /> Instagram
                    </a>
                    <a className={link} href={CONTACT.facebook} target="_blank" rel="noopener">
                      <Facebook size={16} /> Facebook
                    </a>
                  </div>
                </Row>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative h-full min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[var(--color-panel)]">
                <iframe
                  title="Map showing Linbro Fitness Park in Linbro Wedge Business Park"
                  src={embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-dark absolute inset-0 h-full w-full border-0"
                />
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-lime absolute bottom-4 right-4 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]"
                >
                  Open in Maps <ArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
