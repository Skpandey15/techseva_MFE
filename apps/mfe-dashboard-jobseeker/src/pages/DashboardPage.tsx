import { useAuthStore } from '@techseva/shared-store'
import { ProgressWidget } from '../components/ProgressWidget'
import { JobRecommendations } from '../components/JobRecommendations'
import { AppliedJobsTracker } from '../components/AppliedJobsTracker'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0]}</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your job search</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProgressWidget />
        </div>
        <div className="md:col-span-2">
          <AppliedJobsTracker />
        </div>
      </div>

      <JobRecommendations />
    </div>
  )
}
