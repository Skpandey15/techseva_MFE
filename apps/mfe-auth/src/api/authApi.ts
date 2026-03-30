import type { LoginRequest, LoginResponse, SignupRequest, User } from '@techseva/shared-types'

const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@techseva.com',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin User',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'seeker@techseva.com',
    password: 'seeker123',
    role: 'jobseeker',
    fullName: 'Job Seeker',
    createdAt: new Date().toISOString(),
  },
]

function makeToken(user: User): string {
  const payload = { sub: user.id, email: user.email, role: user.role, exp: Date.now() + 900_000 }
  return `mock.jwt.${btoa(JSON.stringify(payload))}`
}

export const authApi = {
  login: async (req: LoginRequest): Promise<LoginResponse> => {
    await new Promise((r) => setTimeout(r, 400))
    const found = MOCK_USERS.find(
      (u) => u.email === req.email && u.password === req.password
    )
    if (!found) throw new Error('Invalid email or password')
    const { password: _pw, ...user } = found
    return { accessToken: makeToken(user), user }
  },

  signup: async (req: SignupRequest): Promise<LoginResponse> => {
    await new Promise((r) => setTimeout(r, 400))
    if (MOCK_USERS.find((u) => u.email === req.email)) {
      throw new Error('Email already in use')
    }
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email: req.email,
      fullName: req.fullName,
      role: req.role,
      createdAt: new Date().toISOString(),
    }
    MOCK_USERS.push({ ...newUser, password: req.password })
    return { accessToken: makeToken(newUser), user: newUser }
  },
}
