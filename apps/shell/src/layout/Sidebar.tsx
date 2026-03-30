import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@techseva/shared-store'
import { cn } from '@techseva/shared-ui'

interface NavItem {
  label: string
  to: string
  roles: Array<'admin' | 'jobseeker'>
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', roles: ['jobseeker'] },
  { label: 'Admin Panel', to: '/admin', roles: ['admin'] },
]

export function Sidebar() {
  const user = useAuthStore((s) => s.user)

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  )

  return (
    <aside className="w-52 border-r bg-background shrink-0 pt-4">
      <nav className="space-y-1 px-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
