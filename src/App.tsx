import { useState, useEffect } from 'react'
import { Route, Switch } from 'wouter'
import { Layout } from './layouts/Layout'
import { Home } from './pages/Home'
import { GettingStarted } from './pages/GettingStarted'
import { Features } from './pages/Features'
import { Configuration } from './pages/Configuration'
import { PageSteer } from './pages/PageSteer'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <Switch>
      <Route path="/">
        <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      </Route>
      <Route path="/docs/:rest*">
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Switch>
            <Route path="/docs/getting-started">
              <GettingStarted />
            </Route>
            <Route path="/docs/features">
              <Features />
            </Route>
            <Route path="/docs/configuration">
              <Configuration />
            </Route>
            <Route path="/docs/page-steer">
              <PageSteer />
            </Route>
            <Route>
              <GettingStarted />
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  )
}

export default App
