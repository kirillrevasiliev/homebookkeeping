import React, { ReactNode } from 'react'
import { useDocumentTitle } from '../hooks/document.hook'

const EmptyLayout: React.FC<{children: ReactNode}> = ({ children }) => {
  useDocumentTitle()
  return (
    <div className="empty-layout indigo lighten-1">
      {children}
    </div>
  )
}

export default EmptyLayout
