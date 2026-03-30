import { useLocation } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

export default function AuthApp() {
  const { pathname } = useLocation()
  return pathname === '/signup' ? <SignupPage /> : <LoginPage />
}
