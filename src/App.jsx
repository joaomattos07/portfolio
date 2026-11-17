import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [destination, setDestination] = useState(null)
  const previousPathname = useRef(location.pathname)
  const controlledNavigation = useRef(false)

  useLayoutEffect(() => {
    const previous = previousPathname.current
    const current = location.pathname
    previousPathname.current = current

    if (previous === current) return

    const wasProject = previous.startsWith('/projetos/')
    const isProject = current.startsWith('/projetos/')

    if (!wasProject && !isProject) return

    if (controlledNavigation.current) {
      controlledNavigation.current = false
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setDestination(null)
    setTransitionPhase('revealing')
  }, [location.pathname])

  useEffect(() => {
    function handleProjectNavigation(event) {
      if (!(event.target instanceof Element)) return

      const link = event.target.closest('a[href]')
      if (!link) return

      const isModifiedClick =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey

      if (
        event.defaultPrevented ||
        isModifiedClick ||
        link.hasAttribute('download') ||
        (link.target && link.target !== '_self')
      ) {
        return
      }

      const url = new URL(link.href, window.location.href)
      const isProjectDestination = url.pathname.startsWith('/projetos/')
      const isProjectSource = location.pathname.startsWith('/projetos/')
      const changesProjectPage =
        (isProjectSource || isProjectDestination) &&
        url.pathname !== location.pathname

      if (
        url.origin !== window.location.origin ||
        !changesProjectPage
      ) {
        return
      }

      event.preventDefault()

      const nextPage = {
        to: `${url.pathname}${url.search}${url.hash}`,
        pathname: url.pathname,
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(nextPage.to)
        return
      }

      setDestination(nextPage)
      setTransitionPhase('covering')
    }

    document.addEventListener('click', handleProjectNavigation, true)

    return () => {
      document.removeEventListener('click', handleProjectNavigation, true)
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    if (
      transitionPhase !== 'covered' ||
      !destination ||
      location.pathname !== destination.pathname
    ) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setTransitionPhase('revealing')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [destination, location.pathname, transitionPhase])

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget) return

    if (transitionPhase === 'covering' && destination) {
      setTransitionPhase('covered')
      controlledNavigation.current = true
      navigate(destination.to)
      return
    }

    if (transitionPhase === 'revealing') {
      setTransitionPhase('idle')
      setDestination(null)
    }
  }

  return (
    <>
      <ScrollManager />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>

      <Footer />

      {transitionPhase !== 'idle' && (
        <div
          aria-hidden="true"
          className={`page-transition-overlay page-transition-overlay--${transitionPhase}`}
          onAnimationEnd={handleTransitionEnd}
        />
      )}
    </>
  )
}
