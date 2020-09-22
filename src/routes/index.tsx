import {
  Home,
  Register,
  Categories,
  HistoryDetailRecord,
  History,
  Login,
  Planning,
  Profile,
  Record
} from '../pages/index'

export const publicRoutes = [
  { path: '/login', title: 'Login', component: Login, exact: true },
  { path: '/register', title: 'Register', component: Register }
]
export const protectedRoutes = [
  { path: '/', component: Home, title: 'Account Bill', exact: true },
  { path: '/history/:id', title: 'DetailRecord', component: HistoryDetailRecord },
  { path: '/history', title: 'History', component: History },
  { path: '/categories', title: 'Categories', component: Categories },
  { path: '/record', title: 'Record', component: Record },
  { path: '/planning', title: 'Planning', component: Planning },
  { path: '/profile', title: 'Profile', component: Profile }
]
