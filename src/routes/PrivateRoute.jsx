import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

export function PrivateRoute ({
  permissions,
  roles,
  redirectTo = '/login',
  children
}) {
  const { isAuthenticated, user, loadingUserData } = useContext(AuthContext)
  const { hasAllPermissions } = validateUserPermissions({ user, permissions, roles })

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  if (!hasAllPermissions) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
