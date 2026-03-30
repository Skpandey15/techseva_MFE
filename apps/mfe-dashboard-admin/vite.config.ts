import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfeDashboardAdmin', // MUST match the key in shell's remotes
      filename: 'remoteEntry.js',
      exposes: {
        './AdminApp': './src/AdminApp.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.26.0' },
        '@tanstack/react-query': { singleton: true, requiredVersion: '^5.59.0' },
        zustand: { singleton: true, requiredVersion: '^5.0.0' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
