import { lazy, Suspense, Component, ComponentType, ReactNode, ErrorInfo } from 'react'
import { Spinner } from '@techseva/shared-ui'

class RemoteErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RemoteErrorBoundary]', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8">
          <h2 className="text-xl font-bold text-destructive">Remote failed to load</h2>
          <pre className="text-xs bg-muted p-4 rounded max-w-xl overflow-auto whitespace-pre-wrap">
            {(this.state.error as Error).message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// React.lazy wraps the dynamic import — required pattern for
// @originjs/vite-plugin-federation to resolve remotes correctly.
const AuthApp = lazy(() => import('mfeAuth/AuthApp'))
const JobseekerApp = lazy(() => import('mfeDashboardJobseeker/JobseekerApp'))
const AdminApp = lazy(() => import('mfeDashboardAdmin/AdminApp'))

function withSuspense<P extends object>(Component: ComponentType<P>) {
  return (props: P) => (
    <RemoteErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    </RemoteErrorBoundary>
  )
}

export const RemoteAuth = withSuspense(AuthApp)
export const RemoteJobseeker = withSuspense(JobseekerApp)
export const RemoteAdmin = withSuspense(AdminApp)
