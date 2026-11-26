import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, cpSync, existsSync, mkdirSync, createReadStream } from 'node:fs'
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

      const catalogSource = resolve(rootDir, 'src/assets/images/projects/katalog')
      const catalogTarget = resolve(outDir, 'images/katalog')
      if (existsSync(catalogSource)) {
        mkdirSync(catalogTarget, { recursive: true })
        cpSync(catalogSource, catalogTarget, { recursive: true, force: true })
      }
    },
  }
}

// Middleware agar request /images/katalog/<slug>/... otomatis membaca dari src/assets/images/projects/katalog/ jika belum ada di public
function serveCatalogAssetsFallback() {
  return {
    name: 'serve-catalog-assets-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/images/katalog/')) {
          const subPath = req.url.replace(/^\/images\/katalog\//, '').split('?')[0];
          const assetCandidate = resolve(rootDir, 'src/assets/images/projects/katalog', subPath);
          if (existsSync(assetCandidate)) {
            const ext = assetCandidate.split('.').pop()?.toLowerCase();
            const mimeTypes = {
              png: 'image/png',
              jpg: 'image/jpeg',
              jpeg: 'image/jpeg',
              webp: 'image/webp',
              svg: 'image/svg+xml',
            };
            if (mimeTypes[ext]) {
              res.setHeader('Content-Type', mimeTypes[ext]);
            }
            createReadStream(assetCandidate).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyPublicMetaFiles(), serveCatalogAssetsFallback()],
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
