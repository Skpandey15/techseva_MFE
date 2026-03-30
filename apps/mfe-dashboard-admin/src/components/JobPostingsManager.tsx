import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner, Button } from '@techseva/shared-ui'
import { useAdminJobs } from '../hooks/useAnalytics'
import type { JobStatus } from '@techseva/shared-types'

const STATUS_VARIANT: Record<JobStatus, 'success' | 'destructive' | 'secondary'> = {
  open: 'success',
  closed: 'destructive',
  draft: 'secondary',
}

export function JobPostingsManager() {
  const { data, isLoading, error } = useAdminJobs()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Job Postings</CardTitle>
        <Button size="sm" variant="outline">+ New Job</Button>
      </CardHeader>
      <CardContent>
        {isLoading && <Spinner className="mx-auto my-4" />}
        {error && <p className="text-sm text-destructive">Failed to load jobs</p>}
        {data && (
          <ul className="space-y-3">
            {data.data.map((job) => (
              <li key={job.id} className="flex items-center justify-between gap-3 border rounded-md p-3">
                <div>
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={STATUS_VARIANT[job.status]}>{job.status}</Badge>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">Edit</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
