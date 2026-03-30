import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@techseva/shared-ui'
import { useSignup } from '../hooks/useSignup'

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['jobseeker', 'admin']),
})
type FormData = z.infer<typeof schema>

interface SignupFormProps {
  onSuccess?: () => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { mutate: signup, isPending, error } = useSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'jobseeker' },
  })

  const onSubmit = (data: FormData) => {
    signup(data, { onSuccess })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join TechSeva today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
            <Input id="fullName" placeholder="Jane Doe" {...register('fullName')} />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="signup-email">Email</label>
            <Input id="signup-email" type="email" placeholder="you@example.com" {...register('email')} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="signup-password">Password</label>
            <Input id="signup-password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="role">I am a…</label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register('role')}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="admin">Admin / Recruiter</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
