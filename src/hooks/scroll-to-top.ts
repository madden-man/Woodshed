import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Land at the top of every page you navigate to. Without this the window keeps
 * whatever scroll position the last page left it at, so following a link from
 * halfway down an article drops you halfway down the next one.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Instant, not smooth: this is a page change, not a jump within a page.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
}
