import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

export default defineConfig({
    base: "/",
    plugins: [react()],
    build: {
        outDir: 'dist', // statiniai failai keliauja į frontend/dist
        emptyOutDir: true  //prieš tai išvalomas tas katalogas
    },
    server: {
        port: 5173 // Lokalus dev serverio portas
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})