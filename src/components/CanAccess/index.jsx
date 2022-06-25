import { useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

export function CanAccess ({ children, permissions, roles }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const { hasAllPermissions, hasAllRoles } = validateUserPermissions({ user, permissions, roles })

  if (!isAuthenticated || !hasAllPermissions || !hasAllRoles) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}
