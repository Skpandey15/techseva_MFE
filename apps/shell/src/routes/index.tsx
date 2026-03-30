import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '@techseva/shared-store'
import { AuthGuard } from '../auth/AuthGuard'
import { RBACGuard } from '../auth/RBACGuard'
import { RootLayout } from '../layout/RootLayout'
import { RemoteAuth, RemoteJobseeker, RemoteAdmin } from './lazyRemotes'

function RoleRedirect() {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  return user.role === 'admin'
    ? <Navigate to="/admin" replace />
    : <Navigate to="/dashboard" replace />
}

function Unauthorized() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Access Denied</h2>
      <p className="text-muted-foreground">You don't have permission to view this page.</p>
    </div>
  )
}

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <RemoteAuth />,
  },
  {
    path: '/signup',
    element: <RemoteAuth />,
  },

  // Protected zone — AuthGuard checks token, shows spinner during hydration
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          // Role-based default redirect after login
          { path: '/', element: <RoleRedirect /> },

          // Jobseeker dashboard
          {
            element: <RBACGuard required="view:jobseeker-dashboard" />,
            children: [
              { path: '/dashboard', element: <RemoteJobseeker /> },
            ],
          },

          // Admin dashboard
          {
            element: <RBACGuard required="view:admin-dashboard" />,
            children: [
              { path: '/admin', element: <RemoteAdmin /> },
            ],
          },

          { path: '/unauthorized', element: <Unauthorized /> },
        ],
      },
    ],
  },
])
