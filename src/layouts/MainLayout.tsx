import React, { ReactNode, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AddButton from '../components/app/AddButton'
import Navigation from '../components/app/Navigation'
import SideBar from '../components/app/SideBar'
import { UserDataType } from '../hooks/userData.hook'
import { useDocumentTitle } from '../hooks/document.hook'
import { toast } from '../utils/toast'
import { messages } from '../utils/messages'

interface MainLayoutProps {
  children: ReactNode;
  userData: UserDataType;
}

const MAX_SCREEN_MOBILE_SIZE = 768

const MainLayout: React.FC<MainLayoutProps> = ({ children, userData }) => {
  useDocumentTitle()
  const { message } = useParams()
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MAX_SCREEN_MOBILE_SIZE)
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile)

  function handleWindowSizeChange() {
    const isMobileSize = window.innerWidth <= MAX_SCREEN_MOBILE_SIZE
    setIsMobile(isMobileSize)
    setIsOpen(!isMobileSize)
  }

  useEffect(() => {
    if (message) toast(messages[message])
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const onToggle = (): void => setIsOpen(!isOpen)
  const onOuterToggle = () => isOpen && isMobile ? onToggle() : {}

  return (
    <div className="app-main-layout">
      <Navigation toggle={onToggle} {...userData} isMobile={isMobile} />
      <SideBar isOpen={isOpen} onClose={onOuterToggle} />
      <main className={`app-content ${isOpen ? '': 'full'}`} onClick={onOuterToggle}>
        <div className="app-page container-fluid">{children}</div>
        <AddButton />
      </main>
    </div>
  )
}
export default MainLayout
