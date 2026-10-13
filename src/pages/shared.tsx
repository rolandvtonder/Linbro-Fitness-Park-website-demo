import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { url } from '../data'

/** Fades a block up as it enters the viewport, once. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

/*
  The opening of every inner page: a full-bleed photo that pushes in on load,
  the same scrims as the home stage, and the title rising out of a mask the
  way the hero words do. `data-hero` tells the nav where the photo ends, so
  it can stay transparent over it and settle into a bar after.
*/
export function PageHero({
  crumb,
  title,
  lede,
  action,
  image,
  pos = '50% 50%',
}: {
  crumb: string
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
  image: string
  pos?: string
}) {
  return (
    <section
      data-hero
      aria-labelledby="page-title"
      className="relative isolate flex min-h-[580px] items-end overflow-hidden px-4 pt-36 pb-14 md:min-h-[80vh] md:px-6 md:pb-20"
    >
      <motion.img
        src={url(image)}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: pos }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            /* the vertical fade is the top layer, so the banner ends on
               exactly the page colour with no seam */
            'linear-gradient(180deg, rgba(10,11,12,0.75) 0%, rgba(10,11,12,0) 26%, rgba(17,18,20,0) 58%, var(--color-ink) 100%), linear-gradient(90deg, rgba(10,11,12,0.9) 0%, rgba(10,11,12,0.62) 42%, rgba(10,11,12,0.2) 100%)',
        }}
      />

      <div className="wrap w-full">
        <motion.nav
          aria-label="Breadcrumb"
          className="label mb-7 flex items-center gap-3"
          style={{ fontSize: 11.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span aria-hidden="true" className="h-[2px] w-[22px] bg-[var(--color-lime)]" />
          <a href={url('/')} className="inline-flex min-h-11 items-center text-white/65 no-underline hover:text-white">
            Home
          </a>
          <span aria-hidden="true" className="text-white/35">
            /
          </span>
          <span aria-current="page" className="text-[var(--color-lime)]">
            {crumb}
          </span>
        </motion.nav>

        <h1 id="page-title" className="display page-title m-0 overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            {title}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          {lede && <p className="lede" style={{ color: 'rgba(255,255,255,0.82)' }}>{lede}</p>}
          {action && <div className="mt-9 flex flex-wrap gap-3">{action}</div>}
        </motion.div>
      </div>
    </section>
  )
}
