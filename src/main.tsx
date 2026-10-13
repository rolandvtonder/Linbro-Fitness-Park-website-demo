import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout'
import './index.css'

/*
  One entry for every page. Each HTML file names its page on <body
  data-page>, and only that page's code is loaded — the inner pages never
  download the scroll stage.
*/
const PAGES: Record<string, () => Promise<{ default: ComponentType }>> = {
  home: () => import('./pages/Home'),
  classes: () => import('./pages/Classes'),
  packages: () => import('./pages/Packages'),
  coaches: () => import('./pages/Coaches'),
  'ladies-only': () => import('./pages/LadiesOnly'),
  contact: () => import('./pages/Contact'),
}

const load = PAGES[document.body.dataset.page ?? 'home'] ?? PAGES.home

load().then(({ default: Page }) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout>
        <Page />
      </Layout>
    </StrictMode>,
  )
})
