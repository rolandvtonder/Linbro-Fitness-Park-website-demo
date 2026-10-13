import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import Nav from './Nav'
import Footer from './Footer'

/* The chrome every page shares: skip link, nav, footer. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </MotionConfig>
  )
}
