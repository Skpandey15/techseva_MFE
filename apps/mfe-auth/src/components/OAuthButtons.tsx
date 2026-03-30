import { Button } from '@techseva/shared-ui'
import { useFeatureFlagStore } from '@techseva/shared-store'

export function OAuthButtons() {
  const isOAuthEnabled = useFeatureFlagStore((s) => s.isEnabled('oauthEnabled'))

  if (!isOAuthEnabled) return null

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => console.log('Google OAuth — connect to backend')}
        >
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => console.log('GitHub OAuth — connect to backend')}
        >
          GitHub
        </Button>
      </div>
    </div>
  )
}
