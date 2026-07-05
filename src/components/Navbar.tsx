import { Sun, Moon, Menu, X } from 'lucide-react'
import { Link } from 'wouter'
import { useState } from 'react'

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

export function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            cookiebody
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link href="/docs/getting-started" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
              Docs
            </Link>
            <Link href="/docs/features" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
              Features
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/cookiebody"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 transition-colors hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg p-2 transition-colors hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 md:hidden"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t px-4 py-3 md:hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <Link href="/docs/getting-started" className="block py-2 text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileOpen(false)}>
            Docs
          </Link>
          <Link href="/docs/features" className="block py-2 text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileOpen(false)}>
            Features
          </Link>
        </nav>
      )}
    </header>
  )
}
