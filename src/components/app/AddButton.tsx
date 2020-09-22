import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'

const AddButton: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const path = location.pathname === '/categories' ? 'record' : 'categories'
  const icon = location.pathname === '/categories' ? 'add' : 'create'

  return (
    <Button
      onClick={() => history.push(`/${path}`)}
      className="fixed-action-btn purple darken-4"
      tooltipOptions={{ position: 'top' }}
      tooltip={`Create a ${path}`}
      icon={<Icon>{icon}</Icon>}
      node="button"
      floating
      large
    />
  )
}

export default AddButton
