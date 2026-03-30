import { useAuthStore } from '@techseva/shared-store'
import { AnalyticsWidget } from '../components/AnalyticsWidget'
import { UserManagement } from '../components/UserManagement'
import { JobPostingsManager } from '../components/JobPostingsManager'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Signed in as {user?.fullName} · {user?.email}
        </p>
      </div>

      <AnalyticsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserManagement />
        <JobPostingsManager />
      </div>
    </div>
  )
}
