import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@techseva/shared-store'
import { Card, CardContent, CardHeader, CardTitle } from '@techseva/shared-ui'
import { jobseekerApi } from '../api/jobseekerApi'

export function ProgressWidget() {
  const user = useAuthStore((s) => s.user)
  const { data: completion = 0, isLoading } = useQuery({
    queryKey: ['profile-completion', user?.id],
    queryFn: () => jobseekerApi.getProfileCompletion(user!.id),
    enabled: !!user,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-4 bg-muted animate-pulse rounded" />
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{completion}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            {completion < 100 && (
              <p className="text-xs text-muted-foreground">
                Complete your profile to get better recommendations
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
