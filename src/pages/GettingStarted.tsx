export function GettingStarted() {
  return (
    <article>
      <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        Getting Started
      </h1>
      <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Welcome to cookiebody's documentation site. This guide will help you understand
        the structure and how to add your own content.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Quick Start
      </h2>
      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`# Clone the repository
git clone https://github.com/cookiebody/cookiebody.github.io.git

# Install dependencies
cd cookiebody.github.io
npm install

# Start dev server
npm run dev`}
        </pre>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Project Structure
      </h2>
      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Page layout templates
│   ├── pages/         # Page content
│   ├── App.tsx        # Router setup
│   └── main.tsx       # Entry point
├── public/            # Static assets
└── index.html         # HTML template`}
        </pre>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Adding Pages
      </h2>
      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Create a new component in <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>src/pages/</code>,
        then add a route in <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>App.tsx</code> and
        a sidebar entry in <code className="rounded px-1.5 py-0.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>components/Sidebar.tsx</code>.
      </p>
    </article>
  )
}
