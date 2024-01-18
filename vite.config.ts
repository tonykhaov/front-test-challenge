/// <reference types="vitest" />
import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [!process.env.VITEST && remix(), tsconfigPaths()],
  server: {
    port: 9999,
  },
  test: {
    globals: true,
    setupFiles: './test/setup.ts',
    environment: 'happy-dom',
  },
})
