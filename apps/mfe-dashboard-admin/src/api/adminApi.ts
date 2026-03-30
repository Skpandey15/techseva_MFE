import type { User, Job, PaginatedResponse } from '@techseva/shared-types'

const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@techseva.com', fullName: 'Admin User', role: 'admin', createdAt: new Date(Date.now() - 8640000000).toISOString() },
  { id: '2', email: 'seeker@techseva.com', fullName: 'Job Seeker', role: 'jobseeker', createdAt: new Date(Date.now() - 5184000000).toISOString() },
  { id: '3', email: 'alice@example.com', fullName: 'Alice Johnson', role: 'jobseeker', createdAt: new Date(Date.now() - 2592000000).toISOString() },
  { id: '4', email: 'bob@example.com', fullName: 'Bob Smith', role: 'jobseeker', createdAt: new Date(Date.now() - 1296000000).toISOString() },
]

const MOCK_JOBS: Job[] = [
  { id: 'j1', title: 'Frontend Engineer', company: 'Acme Corp', location: 'Remote', description: '...', status: 'open', postedAt: new Date(Date.now() - 86400000).toISOString(), tags: ['React', 'TypeScript'] },
  { id: 'j2', title: 'Full Stack Developer', company: 'StartupXYZ', location: 'New York, NY', description: '...', status: 'open', postedAt: new Date(Date.now() - 172800000).toISOString(), tags: ['Node.js', 'React'] },
  { id: 'j3', title: 'DevOps Engineer', company: 'BigTech Inc', location: 'Remote', description: '...', status: 'closed', postedAt: new Date(Date.now() - 604800000).toISOString(), tags: ['AWS', 'Kubernetes'] },
]

export const adminApi = {
  getUsers: async (): Promise<PaginatedResponse<User>> => {
    await new Promise((r) => setTimeout(r, 300))
    return { data: MOCK_USERS, total: MOCK_USERS.length, page: 1, limit: 10, hasNextPage: false }
  },

  getJobs: async (): Promise<PaginatedResponse<Job>> => {
    await new Promise((r) => setTimeout(r, 300))
    return { data: MOCK_JOBS, total: MOCK_JOBS.length, page: 1, limit: 10, hasNextPage: false }
  },

  getAnalytics: async () => {
    await new Promise((r) => setTimeout(r, 200))
    return {
      totalUsers: MOCK_USERS.length,
      activeJobs: MOCK_JOBS.filter((j) => j.status === 'open').length,
      totalApplications: 18,
      placementRate: 34,
    }
  },
}
