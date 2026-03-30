import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@techseva/shared-store'
import type { JobApplication, PaginatedResponse } from '@techseva/shared-types'
import { jobseekerApi } from '../api/jobseekerApi'

export function useAppliedJobs() {
  const user = useAuthStore((s) => s.user)

  return useQuery<PaginatedResponse<JobApplication>>({
    queryKey: ['applied-jobs', user?.id],
    queryFn: () => jobseekerApi.getApplications(user!.id),
    enabled: !!user,
  })
}
