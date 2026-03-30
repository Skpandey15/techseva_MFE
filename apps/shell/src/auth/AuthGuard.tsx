import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@techseva/shared-store'
import { Spinner } from '@techseva/shared-ui'

export function AuthGuard() {
  const { isAuthenticated, isHydrating } = useAuthStore()

  // Block render until silent refresh resolves — prevents flash of /login
  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
