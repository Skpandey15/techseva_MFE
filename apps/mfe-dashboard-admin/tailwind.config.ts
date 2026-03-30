import type { Config } from 'tailwindcss'
import baseConfig from '../../packages/shared-ui/tailwind.config'

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/shared-ui/src/**/*.{ts,tsx}',
  ],
}

export default config
