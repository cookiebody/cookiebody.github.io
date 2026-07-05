export function Features() {
  const features = [
    {
      title: 'Dark Mode',
      description: 'Automatic dark mode detection with manual toggle. Persists preference in localStorage.',
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first layout with collapsible sidebar and responsive navigation.',
    },
    {
      title: 'Fast Navigation',
      description: 'Client-side routing with wouter for instant page transitions without full reloads.',
    },
    {
      title: 'Modern Stack',
      description: 'Built with React 19, TypeScript, Vite, and Tailwind CSS v4 for a great developer experience.',
    },
    {
      title: 'GitHub Pages Ready',
      description: 'Pre-configured with GitHub Actions for automatic deployment on every push.',
    },
    {
      title: 'Customizable',
      description: 'Clean component architecture makes it easy to add new pages, sections, and styles.',
    },
  ]

  return (
    <article>
      <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        Features
      </h1>
      <p className="mb-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        This site comes with a set of features out of the box to get you started quickly.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border p-5 transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <h3 className="mb-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}
