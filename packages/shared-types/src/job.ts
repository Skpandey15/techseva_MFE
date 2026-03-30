export type JobStatus = 'open' | 'closed' | 'draft'
export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  status: JobStatus
  postedAt: string
  tags: string[]
  salary?: string
}

export interface JobApplication {
  id: string
  jobId: string
  userId: string
  status: ApplicationStatus
  appliedAt: string
  job: Job
}
