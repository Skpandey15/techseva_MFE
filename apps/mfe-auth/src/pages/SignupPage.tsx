import { Link, useNavigate } from 'react-router-dom'
import { SignupForm } from '../components/SignupForm'
import { OAuthButtons } from '../components/OAuthButtons'
import { useAuthStore } from '@techseva/shared-store'

export function SignupPage() {
  const navigate = useNavigate()

  const handleSuccess = () => {
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
        <SignupForm onSuccess={handleSuccess} />
        <OAuthButtons />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
