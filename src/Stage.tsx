import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { animate, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { SCROLL_VH, INTRO_MS, P, I, G, BG, span, ramp, lerp } from './scroll'
import { LIME, OCTIV_URL, WEEK, WEEKLY_CLASSES, todayIndex, url } from './data'
import { ArrowUpRight } from './icons'

/*
  The hero: one scroll-choreographed scene, after the Marlin reference.

  Scrolling drives a timeline rather than moving a page. Three acts travel up
  as a parallax filmstrip — the hero, the four services, the facilities — over
  three stills of the gym that push in slowly and cross-dissolve at each move.

  Layout is a fixed artboard of absolutely positioned elements, scaled to the
  window. Two artboards: 1440x810 for landscape screens and 400x800 for
  phones and portrait tablets, because a landscape composition scaled down to
  a phone's width puts 16px body copy at about 4px.

  The artboard is fitted (not cropped) and centred. The photos, scrims and
  nav are viewport-level, so the frame is always full-bleed and a fitted
  artboard never shows bars — it just gains margin on the long axis.
*/

const DESK = { W: 1440, H: 810, SAFE: 96 }
const MOB = { W: 400, H: 800, SAFE: 24 }

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

const HERO_WORDS = ['Train', 'Stronger', 'Together']
const HERO_BODY = {
  desktop: [
    'Functional fitness, mobility and expert coaching',
    'for every walk of life, from first-timers to',
    'athletes — indoors and out in Linbro Park.',
  ],
  mobile: [
    'Functional fitness, mobility and',
    'expert coaching for every walk of',
    'life, from first-timers to athletes —',
    'indoors and out in Linbro Park.',
  ],
}

/* The four services, at the corners of Act 2. */
const TILES = [
  { art: 'floor-sm', pos: '50% 60%', label: ['Functional', 'Fitness'], href: url('/classes/') },
  { art: 'sand-court-sm', pos: '50% 60%', label: ['Mobility &', 'Stretch'], href: url('/classes/') },
  { art: 'hero-lift-sm', pos: '45% 40%', label: ['Personal', 'Training'], href: url('/coaches/') },
  { art: 'kit-sm', pos: '0% 75%', label: ['Nutrition &', 'Wellness'], href: url('/coaches/') },
]

/** Reveals behind a clip mask, rising. Spans, so it can sit inside h1 and p. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

type Viewport = { w: number; h: number }

function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useLayoutEffect(() => {
    const read = () =>
      setVp((prev) => {
        const w = window.innerWidth
        const h = window.innerHeight
        /* Phones resize the viewport as the URL bar slides. Ignore small
           height-only changes so the stage does not rescale mid-scroll. */
        if (w === prev.w && Math.abs(h - prev.h) < 120) return prev
        return { w, h }
      })
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])
  return vp
}

export default function Stage() {
  const wrap = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const vp = useViewport()
  const [p, setP] = useState(0)
  const [intro, setIntro] = useState(reduced ? 1 : 0)

  /* A spring between the scrollbar and the timeline takes the wheel's steps
     out of the motion. Reduced motion reads the scrollbar directly. */
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.5, restDelta: 0.0005 })
  useMotionValueEvent(smooth, 'change', (v) => {
    if (!reduced) setP(v)
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) setP(v)
  })

  /* The hero's word stagger plays once on load. */
  useEffect(() => {
    if (reduced) {
      setIntro(1)
      return
    }
    const c = animate(0, 1, { duration: INTRO_MS / 1000, ease: 'linear', onUpdate: setIntro })
    return () => c.stop()
  }, [reduced])

  const m = vp.w < 900 || vp.w / vp.h < 1.05
  const A = m ? MOB : DESK
  const GW = A.W - A.SAFE * 2
  const scale = Math.min(vp.w / A.W, vp.h / A.H)
  const offX = (vp.w - A.W * scale) / 2
  const offY = Math.max(0, (vp.h - A.H * scale) / 2)
  const g = m ? G.mobile : G.desktop

  /* group positions, interpolated across the three frames */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const y53 = lerp(g.g53.start, g.g53.end, m1)
  const y54 = lerp(lerp(g.g54.enter, g.g54.mid, m1), g.g54.end, m2)
  const y55 = lerp(lerp(g.g55.enter, g.g55.mid, m1), g.g55.end, m2)

  /* stills: cross-dissolve at each move, slow push-in while on screen */
  const kitMix = ramp(p, BG.toKit)
  const bldMix = ramp(p, BG.toBuilding)
  const push = (a: number, b: number, from: number) => (reduced ? 1 : lerp(from, 1, ramp(p, [a, b])))
  const imgStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    willChange: 'transform, opacity',
  }

  const today = todayIndex()
  const tWord = (i: number) => span(intro, I.word(i))
  const tStat = span(intro, I.stat)

  return (
    <div ref={wrap} id="top" data-hero style={{ height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
      <section className="stage-frame" aria-label="Linbro Fitness Park — Stronger Together">
        {/* ---- the footage: three stills ---- */}
        <img
          src={url('/assets/hero-lift.webp')}
          alt=""
          fetchPriority="high"
          style={{
            ...imgStyle,
            objectPosition: m ? '58% 50%' : '50% 55%',
            transform: `scale(${push(0, 0.57, 1.1)})`,
            opacity: 1 - kitMix,
          }}
        />
        <img
          src={url('/assets/kit.webp')}
          alt=""
          style={{
            ...imgStyle,
            objectPosition: '50% 30%',
            transform: `scale(${push(0.47, 0.87, 1.14)})`,
            opacity: kitMix * (1 - bldMix),
          }}
        />
        <img
          src={url('/assets/building-side.webp')}
          alt=""
          style={{
            ...imgStyle,
            objectPosition: m ? '52% 50%' : '50% 42%',
            transform: `scale(${push(0.79, 1, 1.16)})`,
            opacity: bldMix,
          }}
        />

        {/* ---- section scrims, viewport-wide ---- */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: m
              ? 'linear-gradient(180deg, rgba(10,11,12,0.55) 0%, rgba(10,11,12,0.72) 45%, rgba(10,11,12,0.9) 100%)'
              : 'linear-gradient(90deg, rgba(10,11,12,0.9) 0%, rgba(10,11,12,0.6) 34%, rgba(10,11,12,0.1) 62%, rgba(10,11,12,0.35) 100%)',
            opacity: 1 - m1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: m
              ? 'linear-gradient(180deg, rgba(10,11,12,0.35) 0%, rgba(10,11,12,0.88) 60%, rgba(10,11,12,0.92) 100%)'
              : 'radial-gradient(64% 56% at 50% 78%, rgba(10,11,12,0.9) 0%, rgba(10,11,12,0.45) 58%, rgba(10,11,12,0.15) 100%)',
            opacity: m1 * (1 - m2),
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,11,12,0) 30%, rgba(10,11,12,0.78) 66%, rgba(10,11,12,0.94) 100%)',
            opacity: m2,
            pointerEvents: 'none',
          }}
        />
        {/* top scrim so the fixed nav always clears the photo */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: 160,
            background: 'linear-gradient(180deg, rgba(10,11,12,0.7) 0%, rgba(10,11,12,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ---- the artboard ---- */}
        <div
          style={{
            position: 'absolute',
            left: px(offX),
            top: px(offY),
            width: px(A.W),
            height: px(A.H),
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* ================= ACT 1 — the hero ================= */}
          <div
            style={{
              ...box(A.SAFE, 0, GW, m ? 600 : 642),
              transform: `translateY(${y53}px)`,
              /* fade as it rides up under the nav, so the glass card never
                 collides with the links */
              opacity: 1 - ramp(m1, [0.5, 0.85]),
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="label"
              style={{
                position: 'absolute',
                left: 0,
                top: px(m ? -30 : -44),
                fontSize: px(m ? 11 : 12),
                color: LIME,
                opacity: tWord(0),
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ width: 22, height: 2, background: LIME }} />
              Linbro Park · Stronger Together
            </div>

            <h1 style={{ margin: 0 }}>
              {HERO_WORDS.map((word, i) => (
                <Mask
                  key={word}
                  t={tWord(i)}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: px(m ? i * 54 : -8 + i * 62),
                    width: px(m ? GW : 660),
                    height: px(m ? 64 : 94),
                  }}
                >
                  <span className="display" style={{ display: 'block', fontSize: px(m ? 48 : 72), lineHeight: px(m ? 62 : 86) }}>
                    {word}
                    {i === HERO_WORDS.length - 1 && <span style={{ color: LIME }}>.</span>}{' '}
                  </span>
                </Mask>
              ))}
            </h1>

            <p style={{ margin: 0 }}>
              {(m ? HERO_BODY.mobile : HERO_BODY.desktop).map((line, i) => (
                <Mask
                  key={line}
                  t={span(intro, I.body(i))}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: px((m ? 188 : 262) + i * (m ? 25 : 27)),
                    width: px(m ? GW : 480),
                    height: px(30),
                  }}
                >
                  <span style={{ display: 'block', fontSize: px(m ? 16 : 17), lineHeight: px(24), color: 'rgba(255,255,255,0.84)' }}>
                    {line}{' '}
                  </span>
                </Mask>
              ))}
            </p>

            {/* the two calls to action */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: px(m ? 304 : 400),
                opacity: span(intro, I.cta),
                transform: `translateY(${(1 - span(intro, I.cta)) * 12}px)`,
                display: 'flex',
                gap: px(12),
              }}
            >
              <a className="btn btn-white" href={OCTIV_URL} target="_blank" rel="noopener">
                Book a class
              </a>
              <a className="btn btn-ghost" href={url('/packages/')}>
                Packages
                <span className="dot">
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>

            {/* the weekly-classes card: a real figure from the timetable,
                drawn as a bar per day with today's bar lit */}
            <div
              className="glass"
              style={{
                position: 'absolute',
                left: px(m ? 0 : GW - 459),
                top: px(m ? 388 : 300),
                width: px(m ? GW : 459),
                height: px(m ? 196 : 289),
                borderRadius: px(m ? 36 : 60),
                opacity: tStat,
                transform: `translateY(${(1 - tStat) * 28}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: m ? '24px 28px' : '36px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: px(m ? 15 : 17), lineHeight: px(m ? 20 : 23), color: 'rgba(255,255,255,0.9)' }}>
                    Coached classes
                    <br />
                    every week
                  </div>
                  <div
                    className="display"
                    style={{
                      fontSize: px(m ? 50 : 66),
                      lineHeight: px(m ? 44 : 58),
                      fontVariationSettings: '"wdth" 125, "wght" 300',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {Math.round(WEEKLY_CLASSES * tStat)}
                  </div>
                </div>

                {/* a bar per day */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: px(m ? 66 : 80),
                    height: px(m ? 52 : 56),
                    display: 'flex',
                    gap: px(m ? 10 : 12),
                    alignItems: 'flex-end',
                  }}
                >
                  {WEEK.map((d, i) => {
                    const h = (d.sessions.length / 5) * (m ? 34 : 38) * span(intro, [0.3 + i * 0.05, 0.75 + i * 0.04])
                    return (
                      <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
                        <div
                          style={{
                            height: px(h),
                            borderRadius: 4,
                            background: i === today ? LIME : 'rgba(137,193,63,0.42)',
                            boxShadow: i === today ? `0 0 14px ${LIME}` : undefined,
                          }}
                        />
                        <div className="label" style={{ fontSize: px(9.5), textAlign: 'center', color: i === today ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                          {d.short}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <span className="sr-only">
                  {WEEK.map((d) => `${d.day}: ${d.sessions.length} classes`).join(', ')}
                </span>

                {!m && (
                  <>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: px(152), height: 1, background: 'rgba(255,255,255,0.14)' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: px(172), display: 'flex' }}>
                      {[
                        { k: 'Coaches', pre: '', v: 2, u: '' },
                        { k: 'Training areas', pre: '', v: 2, u: 'in + out' },
                        { k: 'Unlimited from', pre: 'R', v: 750, u: '/mo' },
                      ].map((r, i) => (
                        <div
                          key={r.k}
                          style={{
                            flex: 1,
                            paddingLeft: i ? px(20) : 0,
                            borderLeft: i ? '1px solid rgba(255,255,255,0.14)' : undefined,
                          }}
                        >
                          <div className="display" style={{ fontSize: px(22), fontVariationSettings: '"wdth" 125, "wght" 600', fontVariantNumeric: 'tabular-nums' }}>
                            {r.pre}
                            {Math.round(r.v * tStat)}
                            {r.u && <span style={{ fontSize: px(11), opacity: 0.6 }}> {r.u}</span>}
                          </div>
                          <div className="label" style={{ marginTop: px(7), fontSize: px(9.5), color: 'rgba(255,255,255,0.55)' }}>
                            {r.k}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================= ACT 2 — what we do ================= */}
          <div
            style={{
              ...box(A.SAFE, 0, GW, 640),
              transform: `translateY(${y54}px)`,
              opacity: 1 - ramp(m2, [0.55, 0.9]),
              willChange: 'transform, opacity',
            }}
          >
            {TILES.map((c, i) => {
              const t = span(p, [P.g54In[0] + i * 0.004, P.g54In[1]])
              const w = m ? (GW - 12) / 2 : 255
              const h = m ? 150 : 215
              const pos = m
                ? { x: (i % 2) * (w + 12), y: Math.floor(i / 2) * (h + 12) }
                : [
                    { x: 0, y: 0 },
                    { x: GW - 255, y: 0 },
                    { x: 116, y: 240 },
                    { x: GW - 371, y: 240 },
                  ][i]
              const r = m ? 32 : 46
              const circle = m ? 40 : 54
              return (
                <a
                  key={c.art}
                  href={c.href}
                  aria-label={`${c.label.join(' ')} — find out more`}
                  className="group"
                  style={{ position: 'absolute', left: px(pos.x), top: px(pos.y), width: px(w), height: px(h), opacity: t, borderRadius: px(r) }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(r), overflow: 'hidden' }}>
                    <img
                      src={url(`/assets/${c.art}.webp`)}
                      alt=""
                      loading="lazy"
                      className="transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }}
                    />
                    {/* the label sits on a photo, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(150deg, rgba(10,11,12,0.86) 0%, rgba(10,11,12,0.4) 52%, rgba(10,11,12,0.1) 100%)',
                      }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(r), border: '1px solid rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
                  <div
                    className="display"
                    style={{
                      position: 'absolute',
                      left: px(m ? 18 : 24),
                      top: px(m ? 22 : 30),
                      fontSize: px(m ? 15 : 19),
                      lineHeight: px(m ? 19 : 23),
                      fontVariationSettings: '"wdth" 125, "wght" 650',
                    }}
                  >
                    {c.label[0]}
                    <br />
                    {c.label[1]}
                  </div>
                  <div
                    className="transition-colors duration-200 group-hover:bg-[var(--color-lime)] group-hover:text-[var(--color-ink)]"
                    style={{
                      position: 'absolute',
                      right: px(m ? 12 : 18),
                      bottom: px(m ? 12 : 18),
                      width: px(circle),
                      height: px(circle),
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: '#fff',
                    }}
                  >
                    <ArrowUpRight size={m ? 16 : 20} />
                  </div>
                </a>
              )
            })}

            <h2
              className="display"
              style={{
                position: 'absolute',
                left: 0,
                width: px(GW),
                top: px(m ? 344 : 470),
                margin: 0,
                fontSize: px(m ? 44 : 72),
                lineHeight: m ? px(46) : 0.88,
                textAlign: 'center',
              }}
            >
              Stronger{m ? <br /> : ' '}Together
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px(m ? 0 : (GW - 680) / 2),
                top: px(m ? 454 : 556),
                width: px(m ? GW : 680),
                margin: 0,
                fontSize: px(m ? 16 : 21),
                lineHeight: px(m ? 25 : 32),
                textAlign: 'center',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              A community of like-minded people helping each other get fitter, healthier and happier — in body and in mind.
            </p>
          </div>

          {/* ================= ACT 3 — the facilities ================= */}
          <div style={{ ...box(A.SAFE, 0, GW, 810), transform: `translateY(${y55}px)`, willChange: 'transform' }}>
            <div style={{ position: 'absolute', left: 0, top: px(m ? 330 : 404), width: px(56), height: px(2), background: LIME }} />
            <h2
              className="display"
              style={{
                position: 'absolute',
                left: 0,
                top: px(m ? 352 : 430),
                width: px(m ? GW : 640),
                margin: 0,
                fontSize: px(m ? 30 : 52),
                lineHeight: px(m ? 36 : 56),
              }}
            >
              Under the roof.
              <br />
              Under the sky.
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px(m ? 0 : GW - 460),
                top: px(m ? 446 : 434),
                width: px(m ? GW : 460),
                margin: 0,
                fontSize: px(m ? 15 : 16),
                lineHeight: px(m ? 24 : 27),
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              Train on our indoor floor or take it outside: the grounds include an outdoor training area and a sand
              volleyball court, set in the green of Linbro Wedge Business Park. Functional Fitness and Mobility &amp;
              Stretch run in both.
            </p>
            <a
              href={url('/contact/')}
              className="label inline-flex items-center gap-2 hover:text-[var(--color-lime)] transition-colors"
              style={{
                position: 'absolute',
                left: px(m ? 0 : GW - 460),
                top: px(m ? 600 : 586),
                fontSize: px(12),
                color: '#fff',
                minHeight: 44,
              }}
            >
              Plan your visit <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* scroll cue, gone as soon as the scene starts moving */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 22,
            transform: 'translateX(-50%)',
            display: m ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            opacity: intro * (1 - ramp(p, [0, 0.04])),
            pointerEvents: 'none',
          }}
        >
          <span className="label" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
            Scroll
          </span>
          <span style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.18)', overflow: 'hidden', position: 'relative' }}>
            <span className="scroll-cue" style={{ position: 'absolute', inset: 0, background: LIME }} />
          </span>
        </div>
      </section>
    </div>
  )
}
