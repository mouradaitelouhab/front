import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: [
      'localhost',
      '5174-iu5cikd8m359izkdqq3cv-8eb1bbb7.manusvm.computer',
      '5174-i1y5im51on47sijiv6r8a-5d94768d.manusvm.computer',
      '5175-i1y5im51on47sijiv6r8a-5d94768d.manusvm.computer'
    ]
  }
})
