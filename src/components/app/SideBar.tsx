import React from 'react'
import { NavLink } from 'react-router-dom'
import {protectedRoutes} from '../../routes'

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {

  const excludes = ['DetailRecord', 'Profile']
  const menu = protectedRoutes.filter(i => !excludes.includes(i.title))

  const onNavigationClick = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    if (event.target.tagName === 'A') onClose()
  }

  return (
    <ul className={`sidenav app-sidenav brown lighten-5 ${isOpen ? 'open' : ''}`} onClick={onNavigationClick}>
      {menu.map(({ path, title, exact = false }, index) =>
        (<li key={path+index}>
          <NavLink
            className="waves-effect waves-light"
            exact={exact}
            to={path}
          >
            {title}
          </NavLink>
        </li>)
      )}
    </ul>
  )
}

export default SideBar
