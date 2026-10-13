import { useEffect, useRef, useState } from 'react'
import { NAV, OCTIV_URL, url } from './data'
import { Close, Menu } from './icons'

/*
  The navbar sits outside the scaled stage, at natural size, so it stays
  readable at any width. Over each page's photo it is transparent (a solid
  fill draws a hard seam across the photo); past the photo it settles into a
  frosted bar. Under 900px the link row folds into a full-screen menu.
*/

/* the current page, for aria-current and the underline */
const here = () => {
  const path = window.location.pathname.replace(/index\.html$/, '')
  return NAV.find((n) => path.startsWith(n.h))?.h ?? ''
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const active = here()
  const toggle = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  /* transparent over the page's photo (the home stage or an inner page's
     banner, both marked data-hero), a frosted bar once past it */
  useEffect(() => {
    const on = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero]')
      setSolid(hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 100 : window.scrollY > 40)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  /* menu: lock the page, close on Escape, hand focus in and back */
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const btn = toggle.current
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      btn?.focus()
    }
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300"
      style={{
        background: solid ? 'rgba(17,18,20,0.82)' : 'transparent',
        backdropFilter: solid ? 'blur(14px) saturate(140%)' : undefined,
        WebkitBackdropFilter: solid ? 'blur(14px) saturate(140%)' : undefined,
        borderBottom: `1px solid ${solid ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
      }}
    >
      <nav aria-label="Main" className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-6 px-4 md:h-[88px] md:px-10">
        <a href={url('/')} className="shrink-0" aria-label="Linbro Fitness Park — home">
          <img src={url('/assets/logo-trim.png')} alt="Linbro Fitness Park" width={72} height={58} className="h-[54px] w-auto md:h-[68px]" />
        </a>

        <ul className="m-0 hidden flex-1 list-none items-center justify-center gap-9 p-0 min-[900px]:flex">
          {NAV.map((n) => (
            <li key={n.h}>
              <a
                href={n.h}
                aria-current={active === n.h ? 'page' : undefined}
                className="label relative inline-flex min-h-11 items-center whitespace-nowrap no-underline transition-colors duration-200 hover:text-white"
                style={{ color: active === n.h ? '#fff' : 'rgba(255,255,255,0.74)', fontSize: 11.5 }}
              >
                {n.t}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-[2px] bg-[var(--color-lime)] transition-[width] duration-300"
                  style={{ width: active === n.h ? '100%' : 0 }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 min-[900px]:ml-0">
          <a className="btn btn-lime hidden sm:inline-flex" href={OCTIV_URL} target="_blank" rel="noopener">
            Book a class
          </a>
          <button
            ref={toggle}
            type="button"
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/5 text-white min-[900px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[76px] bottom-0 z-40 flex flex-col overflow-y-auto bg-[var(--color-ink)] px-4 pb-8 pt-4 md:top-[88px] min-[900px]:hidden"
        >
          <ul className="m-0 list-none p-0">
            {NAV.map((n, i) => (
              <li key={n.h} className="border-b border-white/10">
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={n.h}
                  aria-current={active === n.h ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="display flex min-h-16 items-center justify-between py-4 no-underline"
                  style={{ fontSize: 28, lineHeight: 1 }}
                >
                  {n.t}
                  <span className="label" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-lime mt-8 w-full" href={OCTIV_URL} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            Book a class on Octiv
          </a>
        </div>
      )}
    </header>
  )
}
