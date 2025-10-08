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
  build: {
    // Optimizaciones de build para máximo rendimiento
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes en chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
          'i18n': ['react-i18next', 'i18next']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline assets pequeños como base64
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
    host: true, // Permite acceso desde la red
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
