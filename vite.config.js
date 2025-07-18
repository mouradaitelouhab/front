import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


// vite.config.ts
{
  plugins: [
    // ...
    chunkSplitPlugin()
  ]
}
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
      '',
      '',
      ''
    ]
  }
})
