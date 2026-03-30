import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

// Remote URLs are resolved at BUILD TIME (baked into the JS bundle).
// Pass different values via Docker build-args for each environment.
const REMOTE_AUTH_URL =
  process.env.VITE_REMOTE_AUTH_URL ?? 'http://localhost:3001/assets/remoteEntry.js'
const REMOTE_JOBSEEKER_URL =
  process.env.VITE_REMOTE_JOBSEEKER_URL ?? 'http://localhost:3002/assets/remoteEntry.js'
const REMOTE_ADMIN_URL =
  process.env.VITE_REMOTE_ADMIN_URL ?? 'http://localhost:3003/assets/remoteEntry.js'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfeAuth: REMOTE_AUTH_URL,
        mfeDashboardJobseeker: REMOTE_JOBSEEKER_URL,
        mfeDashboardAdmin: REMOTE_ADMIN_URL,
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.26.0' },
        '@tanstack/react-query': { singleton: true, requiredVersion: '^5.59.0' },
        zustand: { singleton: true, requiredVersion: '^5.0.0' },
        '@techseva/shared-store': { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
