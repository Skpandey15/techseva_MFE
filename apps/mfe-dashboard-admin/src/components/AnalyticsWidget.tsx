import { Card, CardContent, CardHeader, CardTitle, Spinner } from '@techseva/shared-ui'
import { useAnalytics } from '../hooks/useAnalytics'

interface StatCardProps {
  label: string
  value: number | string
  suffix?: string
}

function StatCard({ label, value, suffix }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">
          {value}
          {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
        </p>
      </CardContent>
    </Card>
  )
}

export function AnalyticsWidget() {
  const { data, isLoading, error } = useAnalytics()

  if (isLoading) return <Spinner className="mx-auto my-8" />
  if (error) return <p className="text-sm text-destructive">Failed to load analytics</p>

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Platform Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={data!.totalUsers} />
        <StatCard label="Active Jobs" value={data!.activeJobs} />
        <StatCard label="Applications" value={data!.totalApplications} />
        <StatCard label="Placement Rate" value={data!.placementRate} suffix="%" />
      </div>
    </div>
  )
}
