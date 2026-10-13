/*
  Scroll choreography for the hero stage.

  Adapted from the Marlin motion prototype: a 20,000ms timeline divided by
  20,000 so each phase is a fraction of the scrollbar. Three content groups
  travel up as a parallax filmstrip at different rates:

      frame      Act 1 (hero)   Act 2 (services)   Act 3 (facilities)
      start      186            1050 (parked)      1400 (parked)
      move1      -774           105                740
      move2      -              -1115              144

  Two changes from the prototype:
  - The hero's word stagger plays on load (INTRO_MS), not on scroll, so the
    page never opens on an empty stage.
  - The footage is three stills instead of two video clips. Each gets a slow
    push-in while it is on screen and they cross-dissolve during the moves.
*/

export const TOTAL_MS = 20000
export const SCROLL_VH = 560
export const INTRO_MS = 1500

const at = (ms: number) => ms / TOTAL_MS

/** Phase windows as scroll progress. */
export const P = {
  /* Act 2's tiles fade in while still parked below the fold */
  g54In: [at(3000), at(3600)],
  /* the 6000ms transition: hero out, services in */
  move1: [at(8000), at(14000)],
  /* the 4500ms transition, landing at 0.90 so the settled facilities frame
     holds for a beat before the timetable */
  move2: [at(15500), 0.9],
} as const

/* Intro windows, as fractions of INTRO_MS. 0.07 apart is ~105ms per word. */
export const I = {
  word: (i: number) => [i * 0.07, i * 0.07 + 0.34] as const,
  body: (i: number) => [0.2 + i * 0.05, 0.2 + i * 0.05 + 0.34] as const,
  cta: [0.42, 0.78] as const,
  stat: [0.25, 1] as const,
}

/** Where each group sits, in design pixels. */
export const G = {
  desktop: {
    g53: { start: 186, end: -774 },
    g54: { enter: 1050, mid: 105, end: -1115 },
    g55: { enter: 1400, mid: 740, end: 144 },
  },
  mobile: {
    g53: { start: 128, end: -900 },
    g54: { enter: 920, mid: 140, end: -1000 },
    g55: { enter: 1100, mid: 760, end: 40 },
  },
} as const

/** Background stills and the windows over which each hands to the next. */
export const BG = {
  toKit: [0.47, 0.57],
  toBuilding: [0.79, 0.87],
} as const

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
