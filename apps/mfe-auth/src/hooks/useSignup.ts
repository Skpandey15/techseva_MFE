import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@techseva/shared-store'
import type { SignupRequest, LoginResponse } from '@techseva/shared-types'
import { authApi } from '../api/authApi'

export function useSignup() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  return useMutation<LoginResponse, Error, SignupRequest>({
    mutationFn: authApi.signup,
    onSuccess: ({ accessToken, user }) => {
      setAccessToken(accessToken, user)
    },
  })
}
