import { create } from 'zustand'

export type FlagKey = 'oauthEnabled' | 'newDashboardUI' | 'analyticsV2'

interface FeatureFlagState {
  flags: Record<FlagKey, boolean>
  isEnabled: (key: FlagKey) => boolean
  setFlag: (key: FlagKey, value: boolean) => void
  loadFlags: (remoteFlags: Partial<Record<FlagKey, boolean>>) => void
}

const DEFAULT_FLAGS: Record<FlagKey, boolean> = {
  oauthEnabled: false,
  newDashboardUI: false,
  analyticsV2: false,
}

export const useFeatureFlagStore = create<FeatureFlagState>((set, get) => ({
  flags: DEFAULT_FLAGS,
  isEnabled: (key) => get().flags[key] ?? false,
  setFlag: (key, value) =>
    set((state) => ({ flags: { ...state.flags, [key]: value } })),
  loadFlags: (remoteFlags) =>
    set((state) => ({ flags: { ...state.flags, ...remoteFlags } })),
}))
