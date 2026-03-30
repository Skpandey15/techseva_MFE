// TypeScript declarations for runtime modules loaded via Module Federation.
// One declaration per expose path in each remote's vite.config.ts.

declare module 'mfeAuth/AuthApp' {
  import type { FC } from 'react'
  const AuthApp: FC
  export default AuthApp
}

declare module 'mfeDashboardJobseeker/JobseekerApp' {
  import type { FC } from 'react'
  const JobseekerApp: FC
  export default JobseekerApp
}

declare module 'mfeDashboardAdmin/AdminApp' {
  import type { FC } from 'react'
  const AdminApp: FC
  export default AdminApp
}
