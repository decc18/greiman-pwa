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
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,pdf}'],
        globIgnores: [
          '**/node_modules/**/*',
          '**/video/**/*',
          '**/*.mp4',
        ],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        navigationFallback: 'index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?v=1`;
              },
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Graiman PWA - Productos de Alta Calidad',
        short_name: 'Graiman PWA',
        description: 'Aplicación PWA de productos Graiman - Porcelanato y Regaderas de alta calidad',
        theme_color: '#008296',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: process.env.NODE_ENV === 'production' ? '/greiman-pwa/' : '/',
        start_url: process.env.NODE_ENV === 'production' ? '/greiman-pwa/' : '/',
        lang: 'es',
        categories: ['business', 'shopping'],
        prefer_related_applications: false,
        display_override: ['standalone', 'minimal-ui'],
        launch_handler: {
          client_mode: 'focus-existing'
        },
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'android-icon-192x192.png',
            sizes: '192x192',
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
