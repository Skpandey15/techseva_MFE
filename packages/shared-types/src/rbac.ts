import type { UserRole } from './user'

export type Permission =
  | 'view:jobseeker-dashboard'
  | 'view:admin-dashboard'
  | 'manage:users'
  | 'manage:jobs'
  | 'apply:jobs'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  jobseeker: ['view:jobseeker-dashboard', 'apply:jobs'],
  admin: ['view:admin-dashboard', 'manage:users', 'manage:jobs'],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}
