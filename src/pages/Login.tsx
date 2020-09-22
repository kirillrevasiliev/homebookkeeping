import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Col, Row, CardPanel, Button } from 'react-materialize'
import { email, password } from '../components/form/formUtils'
import { useFirebaseAuth } from '../hooks/auth.hook'
import SmartForm from '../components/form/SmartForm'
import { messages } from '../utils/messages'
import { toast } from '../utils/toast'
import { useQuery } from '../hooks/location.hook'

declare type ObjectType = { [key: string]: string }

const defaultState = {
  email: {
    ...email,
    icon: 'email'
  },
  password: {
    ...password,
    icon: 'vpn_key'
  }
}

const Login: React.FC = () => {
  const { login } = useFirebaseAuth()
  const history = useHistory()
  const query = useQuery()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const message = query.get('message')
    if (message) {
      toast(messages[message])
      history.push('/login')
    }
  }, [])

  const onSubmit = async (state: ObjectType): Promise<void> =>  {
    setLoading(true)
    try {
      await login(state.email, state.password)
      history.push('/?message=login')
    } catch (e) {
      toast(`[Error]: ${messages[e.code]}`, 'red')
      setLoading(false)
    }
  }

  return (
    <Row>
      <Col s={12} m={8} l={6} offset="l3 m2">
        <CardPanel className="z-depth-3">
          <h5>Register</h5>
          <SmartForm
            inputsOptions={defaultState}
            submitTitle="Login"
            disabled={loading}
            submit={onSubmit}
          />
          <span> or</span>
          <NavLink to="/register">
            <Button waves="light" node="button" flat>
              Register
            </Button>
          </NavLink>
        </CardPanel>
      </Col>
    </Row>
  )
}

export default Login
