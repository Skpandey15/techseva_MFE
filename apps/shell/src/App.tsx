import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './routes'
import { useAuthStore } from '@techseva/shared-store'
import { FlagProvider } from './featureFlags/FlagProvider'
import { apiClient } from './api/axiosInstance'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

export function App() {
  const { setAccessToken, clearAuth } = useAuthStore()

  // On mount: attempt silent refresh using the httpOnly refresh cookie.
  // This re-establishes the in-memory access token after a page reload.
  // isHydrating starts as `true` — AuthGuard shows a spinner until this resolves.
  useEffect(() => {
    apiClient
      .post('/auth/refresh')
      .then(({ data }) => {
        setAccessToken(data.accessToken, data.user)
      })
      .catch(() => {
        // No valid session — clearAuth sets isHydrating to false, showing login
        clearAuth()
      })
  }, [setAccessToken, clearAuth])

  return (
    <QueryClientProvider client={queryClient}>
      <FlagProvider>
        <RouterProvider router={router} />
      </FlagProvider>
    </QueryClientProvider>
  )
}
