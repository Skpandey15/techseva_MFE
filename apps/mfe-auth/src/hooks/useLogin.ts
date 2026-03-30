import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@techseva/shared-store'
import type { LoginRequest, LoginResponse } from '@techseva/shared-types'
import { authApi } from '../api/authApi'

export function useLogin() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: ({ accessToken, user }) => {
      // Store token in MEMORY only — never in localStorage
      setAccessToken(accessToken, user)
    },
  })
}
