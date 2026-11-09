import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const publicMetaFiles = ['sitemap.xml', 'robots.txt']

function copyPublicMetaFiles() {
  let outDir = resolve(rootDir, 'dist')

  return {
    name: 'copy-public-meta-files',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(rootDir, config.build.outDir)
    },
    closeBundle() {
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

      for (const file of publicMetaFiles) {
        const source = resolve(rootDir, 'public', file)
        if (!existsSync(source)) continue
        copyFileSync(source, resolve(outDir, file))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyPublicMetaFiles()],
  publicDir: 'public',
  build: {
    copyPublicDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
