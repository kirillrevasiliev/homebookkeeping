import React from 'react'
import { useUserData } from '../hooks/userData.hook'
import { AVATAR_DEFAULT } from '../const'

type ObjectType = {[key: string]: any}
interface UserProps {
  user?: ObjectType;
  isActive: boolean;
}

const User: React.FC<UserProps> = ({ user, isActive }) => {
  const { userData } = useUserData()
  const styles = {
    container: {
      display: 'flex',
      height: 64,
      alignItems: 'center',
      padding: '7px 15px',
      minWidth: 130
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 10
    }
  }
  console.log('user', userData)
  return (
    <div className={`avatar ${isActive && 'active'}`} style={styles.container}>
      <img alt="" className="circle" style={styles.avatar} src={userData.avatarUrl || AVATAR_DEFAULT} />
      <span className="title">
        {userData.name || '   '}
      </span>
    </div>
  )
}

export default User
