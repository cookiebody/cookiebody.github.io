export function PageSteer() {
  return (
    <article>
      <h1 className="mb-4 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        Page Steer
      </h1>
      <p className="mb-6 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        The GUI Agent Living in Your Webpage. Control web interfaces with natural language.
      </p>

      <div
        className="mb-8 rounded-xl border p-5"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border px-2.5 py-1" style={{ color: 'var(--accent)' }}>MIT License</span>
          <span className="rounded-full border px-2.5 py-1" style={{ color: 'var(--accent)' }}>TypeScript</span>
          <span className="rounded-full border px-2.5 py-1" style={{ color: 'var(--accent)' }}>In-page JavaScript</span>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        What is Page Steer?
      </h2>
      <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Page Steer is an AI-powered GUI agent that lives directly in your webpage. Unlike traditional browser
        automation tools that require headless browsers, Python, or browser extensions, Page Steer operates
        entirely as in-page JavaScript. It uses text-based DOM manipulation — no screenshots or multi-modal
        LLMs needed.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Key Features
      </h2>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {[
          { title: '🎯 Easy Integration', desc: 'No browser extension, Python, or headless browser needed. Pure in-page JavaScript.' },
          { title: '📖 Text-based DOM', desc: 'No screenshots. No multi-modal LLMs or special permissions required.' },
          { title: '🧠 Bring Your Own LLM', desc: 'Works with any LLM provider — OpenAI, Qwen, Claude, or your own.' },
          { title: '🐙 Chrome Extension', desc: 'Optional extension for multi-page tasks across browser tabs.' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border p-4"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Use Cases
      </h2>
      <ul className="mb-6 space-y-2 text-base" style={{ color: 'var(--text-secondary)' }}>
        <li className="flex items-start gap-2">
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>SaaS AI Copilot</strong> — Ship an AI copilot in your product in lines of code. No backend rewrite.</span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>Smart Form Filling</strong> — Turn 20-click workflows into one sentence. Perfect for ERP, CRM, and admin systems.</span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>Accessibility</strong> — Make any web app accessible through natural language. Voice commands, zero barrier.</span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>Multi-page Agent</strong> — Extend your agent's reach across browser tabs with the Chrome extension.</span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>MCP Server</strong> — Allow your agent clients to control your browser programmatically.</span>
        </li>
      </ul>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Quick Start
      </h2>
      <p className="mb-3 text-base" style={{ color: 'var(--text-secondary)' }}>
        One-line CDN integration:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`<script src="https://cdn.jsdelivr.net/npm/page-steer@1.10.0/dist/iife/page-steer.demo.js"
        crossorigin="true"></script>`}
        </pre>
      </div>

      <p className="mb-3 text-base" style={{ color: 'var(--text-secondary)' }}>
        Or install via NPM:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`npm install page-steer`}
        </pre>
      </div>

      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`import { PageSteer } from 'page-steer'

const agent = new PageSteer({
  model: 'qwen3.5-plus',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'YOUR_API_KEY',
  language: 'en-US',
})

await agent.execute('Click the login button')`}
        </pre>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Architecture
      </h2>
      <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Page Steer is a monorepo with the following packages:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <pre className="text-sm" style={{ color: 'var(--text-primary)' }}>
{`packages/
├── core/             # Core agent logic and DOM processing
├── page-steer/       # Main SDK package (npm: page-steer)
├── page-controller/  # Low-level page control primitives
├── ui/               # Chat UI components
├── llms/             # LLM provider adapters
├── mcp/              # MCP server integration
├── extension/        # Chrome extension for multi-page tasks
└── website/          # Documentation site`}
        </pre>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Links
      </h2>
      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/nicepkg/page-steer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/page-steer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          NPM
        </a>
        <a
          href="https://alibaba.github.io/page-steer/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          Demo
        </a>
        <a
          href="https://alibaba.github.io/page-steer/docs/introduction/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)' }}
        >
          Docs
        </a>
      </div>
    </article>
  )
}
