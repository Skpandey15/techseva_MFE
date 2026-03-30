import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner, Avatar, AvatarFallback } from '@techseva/shared-ui'
import { useUsers } from '../hooks/useUsers'

export function UserManagement() {
  const { data, isLoading, error } = useUsers()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Users</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Spinner className="mx-auto my-4" />}
        {error && <p className="text-sm text-destructive">Failed to load users</p>}
        {data && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium text-muted-foreground">User</th>
                  <th className="text-left pb-2 font-medium text-muted-foreground">Role</th>
                  <th className="text-left pb-2 font-medium text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs">
                            {user.fullName.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
