import { Link } from 'wouter'
import { Navbar } from '../components/Navbar'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

interface HomeProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

export function Home({ darkMode, setDarkMode }: HomeProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-32">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
          style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          <Sparkles size={14} />
          Open Source
        </div>
        <h1
          className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
          style={{ color: 'var(--text-primary)' }}
        >
          cookiebody's space
        </h1>
        <p
          className="mx-auto mb-10 max-w-2xl text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          A personal documentation site for notes, projects, and ideas.
          Built with React, Vite, and Tailwind CSS.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/cookiebody"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: 'Fast', desc: 'Built with Vite for instant HMR and lightning-fast builds.' },
            { icon: Shield, title: 'Type Safe', desc: 'Full TypeScript support with strict type checking.' },
            { icon: Sparkles, title: 'Modern', desc: 'Tailwind CSS v4, React 19, and the latest tooling.' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border p-6 transition-colors"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <feature.icon size={24} style={{ color: 'var(--accent)' }} className="mb-3" />
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
        <p>Built by cookiebody · Powered by React + Vite + Tailwind</p>
      </footer>
    </div>
  )
}
