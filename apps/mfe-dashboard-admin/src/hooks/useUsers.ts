import { useQuery } from '@tanstack/react-query'
import type { User, PaginatedResponse } from '@techseva/shared-types'
import { adminApi } from '../api/adminApi'

export function useUsers() {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['admin-users'],
    queryFn: adminApi.getUsers,
    staleTime: 2 * 60 * 1000,
  })
}
