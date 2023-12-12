import { Outlet, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import Login from '../pages/login/Login'

const AdminProtectedRouter = () => {
  const location = useLocation()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  // if the user = admin then access to this route
  return isLoggedIn && userData?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}

export default AdminProtectedRouter
