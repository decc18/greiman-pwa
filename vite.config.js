import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/greiman-pwa/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,pdf}'],
        globIgnores: [
          '**/node_modules/**/*',
          '**/video/**/*', // Excluir videos del precaching
          '**/*.mp4', // Excluir archivos MP4 específicamente
        ],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MB limit
        skipWaiting: true,
        clientsClaim: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'graiman PWA',
        short_name: 'graiman',
        description: 'Una aplicación Progressive Web App desarrollada con Vue.js',
        theme_color: '#008296',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/greiman-pwa/',
        start_url: '/greiman-pwa/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    assetsInlineLimit: 0, // No inline any assets
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash][extname]`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  server: {
    host: true, // Esto permite acceso desde la red local
    port: 5175, // Puerto por defecto de Vite
    open: true, // Abre automáticamente el navegador
    cors: true  // Habilita CORS
  }
})
