import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Establece la base URL relativa
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
    fs: {
      // Permitir servir archivos desde fuera del directorio raíz
      allow: ['../']
    },
    proxy: {
      // Configurar proxy para los sitios web simples
      '/sitios_web_simples': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sitios_web_simples/, '../sitios_web_simples')
      }
    }
  }
})
