import { useEffect, type ReactNode } from 'react'
import { useFeatureFlagStore, type FlagKey } from '@techseva/shared-store'

// In production: fetch flags from your feature-flag service (LaunchDarkly, Unleash, etc.)
// For now we load from environment variables with sensible defaults.
const ENV_FLAGS: Partial<Record<FlagKey, boolean>> = {
  oauthEnabled: import.meta.env.VITE_FLAG_OAUTH === 'true',
  newDashboardUI: import.meta.env.VITE_FLAG_NEW_DASHBOARD === 'true',
  analyticsV2: import.meta.env.VITE_FLAG_ANALYTICS_V2 === 'true',
}

export function FlagProvider({ children }: { children: ReactNode }) {
  const loadFlags = useFeatureFlagStore((s) => s.loadFlags)

  useEffect(() => {
    loadFlags(ENV_FLAGS)
  }, [loadFlags])

  return <>{children}</>
}
