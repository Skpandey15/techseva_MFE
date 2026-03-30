import type { User } from './user'

export interface TokenPayload {
  sub: string
  email: string
  role: string
  iat: number
  exp: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  fullName: string
  role: 'jobseeker' | 'admin'
}

export interface LoginResponse {
  accessToken: string
  user: User
  // refreshToken is set as httpOnly cookie by the server — NOT in this payload
}
