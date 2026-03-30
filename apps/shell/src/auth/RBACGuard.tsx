import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@techseva/shared-store'
import { hasPermission, type Permission } from '@techseva/shared-types'

interface RBACGuardProps {
  required: Permission
  redirectTo?: string
}

export function RBACGuard({ required, redirectTo = '/unauthorized' }: RBACGuardProps) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />

  return hasPermission(user.role, required) ? <Outlet /> : <Navigate to={redirectTo} replace />
}
