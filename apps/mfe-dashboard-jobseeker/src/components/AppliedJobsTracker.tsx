import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from '@techseva/shared-ui'
import { useAppliedJobs } from '../hooks/useAppliedJobs'
import type { ApplicationStatus } from '@techseva/shared-types'

const STATUS_VARIANT: Record<ApplicationStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  applied: 'secondary',
  screening: 'default',
  interview: 'warning',
  offer: 'success',
  rejected: 'destructive',
}

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

export function AppliedJobsTracker() {
  const { data, isLoading, error } = useAppliedJobs()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">My Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Spinner className="mx-auto my-4" />}
        {error && <p className="text-sm text-destructive">Failed to load applications</p>}
        {data?.data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No applications yet</p>
        )}
        {data && data.data.length > 0 && (
          <ul className="space-y-3">
            {data.data.map((app) => (
              <li key={app.id} className="flex items-center justify-between gap-3 border rounded-md p-3">
                <div>
                  <p className="font-medium text-sm">{app.job.title}</p>
                  <p className="text-xs text-muted-foreground">{app.job.company}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[app.status]}>
                  {STATUS_LABEL[app.status]}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
