import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../api/adminApi'

export function useAnalytics() {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: adminApi.getAnalytics,
    staleTime: 5 * 60 * 1000,
  })
}

export function useAdminJobs() {
  return useQuery({
    queryKey: ['admin-jobs'],
    queryFn: adminApi.getJobs,
    staleTime: 2 * 60 * 1000,
  })
}
