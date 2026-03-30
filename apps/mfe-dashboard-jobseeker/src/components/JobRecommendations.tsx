import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from '@techseva/shared-ui'
import { useJobRecommendations } from '../hooks/useJobRecommendations'

export function JobRecommendations() {
  const { data: jobs, isLoading, error } = useJobRecommendations()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recommended Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Spinner className="mx-auto my-4" />}
        {error && <p className="text-sm text-destructive">Failed to load recommendations</p>}
        {jobs && (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li key={job.id} className="border rounded-md p-3 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
                    {job.salary && (
                      <p className="text-xs text-primary mt-0.5">{job.salary}</p>
                    )}
                  </div>
                  <Badge variant="success" className="shrink-0">Open</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
