import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import EmptyLayout from './layouts/EmptyLayout'
import { publicRoutes, protectedRoutes } from './routes'
import { useUserId } from './hooks/auth.hook'
import { useUserData } from './hooks/userData.hook'
import Loader from './components/app/Loader'
import 'materialize-css/dist/js/materialize.min'
import './index.scss'

declare const window: { [key: string]: any }
window.M && window.M.AutoInit()

const App: React.FC = () => {
  const uid = useUserId()
  const { globalLoading, userData, updateUserData } = useUserData()
  const isSignedIn = !!uid

  const redirectTo = isSignedIn ? '/' : '/login'
  const props = isSignedIn ? { uid, ...userData, updateUserData } : {}

  if (globalLoading) return <Loader />

  return (
    <Router>
      <Switch>
        {publicRoutes.map(({ component: Component, path, exact }) => (<Route
          component={() => !isSignedIn
            ? (<EmptyLayout><Component /></EmptyLayout>)
            : (<Redirect to={redirectTo} />)}
          exact={exact}
          path={path}
          key={path}
        />))}
        {protectedRoutes.map(({ component: Component, path, exact }) => (<Route
          component={() => isSignedIn
            ? (<MainLayout userData={userData}><Component {...props as any} /></MainLayout>)
            : (<Redirect to={redirectTo} />)}
          exact={exact}
          path={path}
          key={path}
        />))}
        <Redirect to={redirectTo} />
      </Switch>
    </Router>
  )
}

export default App
