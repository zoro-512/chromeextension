import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import path from 'path'

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Each entry becomes its own output JS file in dist/
        content: path.resolve(__dirname, 'src/content.jsx'),
        popup: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background.js'),
        blocker: path.resolve(__dirname, 'src/blocker.js'), // optional social site blocker
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
