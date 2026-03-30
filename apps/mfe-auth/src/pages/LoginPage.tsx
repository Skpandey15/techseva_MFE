import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { OAuthButtons } from '../components/OAuthButtons'
import { useAuthStore } from '@techseva/shared-store'

export function LoginPage() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    // Shell handles role-based redirect via its router;
    // in standalone dev mode we do a basic redirect here.
    const role = useAuthStore.getState().user?.role
    navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">TechSeva</h1>
          <p className="text-muted-foreground text-sm mt-1">Your career, powered by AI</p>
        </div>
        <LoginForm onSuccess={handleSuccess} />
        <OAuthButtons />
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
