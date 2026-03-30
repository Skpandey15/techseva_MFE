import type { Job, JobApplication, PaginatedResponse } from '@techseva/shared-types'

const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    description: 'Build delightful UIs with React and TypeScript.',
    status: 'open',
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['React', 'TypeScript', 'Tailwind'],
    salary: '$90k–$120k',
  },
  {
    id: 'j2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    description: 'Own features end-to-end in a fast-moving team.',
    status: 'open',
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    tags: ['Node.js', 'React', 'PostgreSQL'],
    salary: '$100k–$140k',
  },
  {
    id: 'j3',
    title: 'Senior React Developer',
    company: 'BigTech Inc',
    location: 'San Francisco, CA',
    description: 'Lead frontend architecture for a platform with 10M users.',
    status: 'open',
    postedAt: new Date(Date.now() - 259200000).toISOString(),
    tags: ['React', 'GraphQL', 'AWS'],
    salary: '$140k–$180k',
  },
]

const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 'a1',
    jobId: 'j1',
    userId: '2',
    status: 'interview',
    appliedAt: new Date(Date.now() - 604800000).toISOString(),
    job: MOCK_JOBS[0],
  },
  {
    id: 'a2',
    jobId: 'j2',
    userId: '2',
    status: 'screening',
    appliedAt: new Date(Date.now() - 432000000).toISOString(),
    job: MOCK_JOBS[1],
  },
]

export const jobseekerApi = {
  getRecommendations: async (_userId: string): Promise<Job[]> => {
    await new Promise((r) => setTimeout(r, 300))
    return MOCK_JOBS
  },

  getApplications: async (userId: string): Promise<PaginatedResponse<JobApplication>> => {
    await new Promise((r) => setTimeout(r, 300))
    const apps = MOCK_APPLICATIONS.filter((a) => a.userId === userId)
    return { data: apps, total: apps.length, page: 1, limit: 10, hasNextPage: false }
  },

  getProfileCompletion: async (_userId: string): Promise<number> => {
    await new Promise((r) => setTimeout(r, 200))
    return 72 // percentage
  },
}
