import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pagesTitle } from '../utils/page-titles'

export function useDocumentTitle (): null {
  const location = useLocation()

  useEffect(() => {
    const [,title] = location.pathname.split('/')
    document.title = `${pagesTitle[title || 'default']} | Home Bookkeeping`
  }, [location.pathname])

  return null
}
