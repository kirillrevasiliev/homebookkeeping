import React, { ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFirebaseAuth } from '../../hooks/auth.hook'
import { Icon, Dropdown, Divider } from 'react-materialize'
import { UserDataType } from '../../hooks/userData.hook'
import { AVATAR_DEFAULT } from '../../const'
import SmartDate from '../SmartDate'

interface NavigationProp extends UserDataType {
  toggle: () => void;
  isMobile: boolean;
}

const Navigation: React.FC<NavigationProp> = ({ toggle, name, avatarUrl, isMobile }) => {
  const { logout } = useFirebaseAuth()

  const onLogout = async (): Promise<void> => {
    await logout()
  }

  const triggerComponent = (): ReactElement => (
    <div className='btn-dropdown white-text'>
      <div className="text-wrap">{name}</div>
      <Icon>arrow_drop_down</Icon>
    </div>
  )

  return (
    <nav className="navbar purple darken-4">
      <div className="nav-wrapper">
        <div className="navbar-left">
          <a href="#" onClick={toggle}><i className="material-icons white-text">dehaze</i></a>
          {!isMobile && (<SmartDate />)}
        </div>

        <ul className="right">
          <li>
            <Dropdown
              id="Dropdown_6"
              options={{
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                outDuration: 250
              }}
              trigger={triggerComponent()}
            >
              <Link to="/profile" className="white-text">
                <img className="circle avatar avatar-small" src={avatarUrl || AVATAR_DEFAULT} />Profile
              </Link>
              <Link to='/login?message=logout' onClick={onLogout}>
                <Icon>assignment_return</Icon>{' '}Logout
              </Link>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
