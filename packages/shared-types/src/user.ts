export type UserRole = 'admin' | 'jobseeker'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
}
