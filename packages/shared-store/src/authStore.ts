import { create } from 'zustand'
import type { User } from '@techseva/shared-types'

interface AuthState {
  // Access token lives ONLY in JS memory — never persisted to localStorage
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
  isHydrating: boolean // true during silent refresh on page load

  setAccessToken: (token: string, user: User) => void
  clearAuth: () => void
  setHydrating: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isHydrating: true, // start true — resolved after silent refresh attempt

  setAccessToken: (token, user) =>
    set({ accessToken: token, user, isAuthenticated: true, isHydrating: false }),

  clearAuth: () =>
    set({ accessToken: null, user: null, isAuthenticated: false, isHydrating: false }),

  setHydrating: (value) => set({ isHydrating: value }),
}))
