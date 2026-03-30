import { Link, useNavigate } from 'react-router-dom'
import { Button, Avatar, AvatarFallback } from '@techseva/shared-ui'
import { useAuthStore } from '@techseva/shared-store'

export function Navbar() {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="text-lg font-bold text-primary">
        TechSeva
      </Link>

      {user && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium">{user.fullName}</span>
            <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {user.fullName.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      )}
    </header>
  )
}
