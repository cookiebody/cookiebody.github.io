export function Configuration() {
  return (
    <article>
      <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        Configuration
      </h1>
      <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Customize the site to match your preferences.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Site Metadata
      </h2>
      <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Update the site title and description in{' '}
        <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
          index.html
        </code>{' '}
        and the navbar brand in{' '}
        <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
          src/components/Navbar.tsx
        </code>.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Theme Colors
      </h2>
      <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        CSS custom properties are defined in{' '}
        <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
          src/index.css
        </code>.
        Modify the <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>:root</code> and{' '}
        <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>.dark</code> blocks
        to change the color scheme.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Deployment
      </h2>
      <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        The site deploys automatically via GitHub Actions. Push to{' '}
        <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>main</code>{' '}
        and the workflow builds and publishes to GitHub Pages.
      </p>
    </article>
  )
}
