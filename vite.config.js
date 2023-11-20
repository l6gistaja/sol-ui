import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://w13.app.foxiot.eu:8443',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
        //rewrite: path
      },
      '/reboot': {
        target: 'https://w13.app.foxiot.eu:8443',
        changeOrigin: true,
      },
      '/restartapp': {
        target: 'https://w13.app.foxiot.eu:8443',
        changeOrigin: true,
      },
      '/save': {
        target: 'https://w13.app.foxiot.eu:8443',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
