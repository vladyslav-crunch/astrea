import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const faviconHref = import.meta.env.DEV
  ? '/favicon-dev.svg'
  : '/favicon-prod.svg'

const existingIcon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null

if (existingIcon) {
  existingIcon.href = faviconHref
} else {
  const iconLink = document.createElement('link')
  iconLink.rel = 'icon'
  iconLink.type = 'image/svg+xml'
  iconLink.href = faviconHref
  document.head.appendChild(iconLink)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
