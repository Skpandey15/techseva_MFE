import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import AuthApp from './AuthApp'
import '@techseva/shared-ui/styles'

const queryClient = new QueryClient()
const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthApp />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
