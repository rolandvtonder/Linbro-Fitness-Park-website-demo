import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

/* One HTML file per page, so each is a real URL on any static host. */
const page = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  /* '/' locally; the GitHub Pages workflow sets BASE_PATH to the repo's sub-path */
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: page('index.html'),
        classes: page('classes/index.html'),
        packages: page('packages/index.html'),
        coaches: page('coaches/index.html'),
        'ladies-only': page('ladies-only/index.html'),
        contact: page('contact/index.html'),
      },
    },
  },
})
