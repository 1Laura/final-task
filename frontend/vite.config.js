import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',  //statiniai failai dedami į backend/public
    emptyOutDir: true  //prieš tai išvalomas tas katalogas
  },
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})