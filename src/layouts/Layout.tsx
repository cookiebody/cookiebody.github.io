import type { ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

interface LayoutProps {
  children: ReactNode
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

export function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
