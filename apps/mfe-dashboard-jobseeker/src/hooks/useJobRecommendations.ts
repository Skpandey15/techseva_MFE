import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@techseva/shared-store'
import type { Job } from '@techseva/shared-types'
import { jobseekerApi } from '../api/jobseekerApi'

export function useJobRecommendations() {
  const user = useAuthStore((s) => s.user)

  return useQuery<Job[]>({
    queryKey: ['job-recommendations', user?.id],
    queryFn: () => jobseekerApi.getRecommendations(user!.id),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  })
}
