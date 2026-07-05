import { Link, useLocation } from 'wouter'
import { BookOpen, Zap, Settings } from 'lucide-react'

const sidebarItems = [
  {
    title: 'Introduction',
    items: [
      { label: 'Getting Started', href: '/docs/getting-started', icon: BookOpen },
    ],
  },
  {
    title: 'Guide',
    items: [
      { label: 'Features', href: '/docs/features', icon: Zap },
      { label: 'Configuration', href: '/docs/configuration', icon: Settings },
    ],
  },
]

export function Sidebar() {
  const [location] = useLocation()

  return (
    <aside
      className="hidden w-64 shrink-0 border-r md:block"
      style={{ backgroundColor: 'var(--bg-sidebar)' }}
    >
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
        {sidebarItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3
              className="mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location === item.href
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive ? 'font-medium' : ''
                      }`}
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : undefined,
                      }}
                    >
                      <Icon size={16} />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
