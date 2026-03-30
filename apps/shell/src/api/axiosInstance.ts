import axios from 'axios'
import { useAuthStore } from '@techseva/shared-store'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000',
  withCredentials: true, // sends httpOnly refresh token cookie automatically
})

// Attach in-memory access token to every outbound request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401: attempt silent refresh, then replay the original request once
let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }
    original._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((newToken) => {
          original.headers.Authorization = `Bearer ${newToken}`
          resolve(apiClient(original))
        })
      })
    }

    isRefreshing = true
    try {
      // Server reads httpOnly refresh cookie automatically (withCredentials: true)
      const { data } = await axios.post(
        '/auth/refresh',
        {},
        { withCredentials: true, baseURL: apiClient.defaults.baseURL }
      )
      const { accessToken, user } = data
      useAuthStore.getState().setAccessToken(accessToken, user)

      refreshQueue.forEach((cb) => cb(accessToken))
      refreshQueue = []

      original.headers.Authorization = `Bearer ${accessToken}`
      return apiClient(original)
    } catch {
      useAuthStore.getState().clearAuth()
      window.location.replace('/login')
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  }
)
