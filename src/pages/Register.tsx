import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, CardPanel, Col, Row } from 'react-materialize'
import { email, password, text } from '../components/form/formUtils'
import SmartForm from '../components/form/SmartForm'
import { useFirebaseAuth } from '../hooks/auth.hook'
import { useUserData } from '../hooks/userData.hook'
import { messages } from '../utils/messages'
import { toast } from '../utils/toast'

declare type ObjectType = { [key: string]: string }

const defaultState = {
  name: {
    ...text,
    icon: 'account_circle',
    label: 'Enter your name'
  },
  email: {
    ...email,
    icon: 'email'
  },
  password: {
    ...password,
    icon: 'vpn_key'
  },
  confirmPassword: {
    ...password,
    icon: ' ',
    error: password.error + ', both password must be equal',
    label: 'Repeat Password',
    validation: {
      ...password.validation,
      confirmPassword: true
    }
  }
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { register } = useFirebaseAuth()
  const { userCreate } = useUserData()
  const history = useHistory()

  const onSubmit = async (state: ObjectType): Promise<void> => {
    setLoading(true)
    try {
      const {user} = await register(state.email, state.password)
      if (user) {
        await userCreate({
          id: user.uid,
          name: state.name
        })
        history.push('/?message=register')
      }
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
            submit={onSubmit}
            inputsOptions={defaultState}
            disabled={loading}
          />
          <span> or</span>
          <NavLink to="/login">
            <Button waves="light" flat>Login</Button>
          </NavLink>
        </CardPanel>
      </Col>
    </Row>
  )
}

export default Register
