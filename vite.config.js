import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase':     ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.webp'],
      manifest: {
        name: 'Calendrier 2k26',
        short_name: 'Calendrier 2k26',
        description: 'Cahier de vacances intelligent avec planning, repas et correction IA',
        theme_color: '#1E1B4B',
        background_color: '#1E1B4B',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-48.webp', sizes: '48x48', type: 'image/webp' },
          { src: 'icons/icon-72.webp', sizes: '72x72', type: 'image/webp' },
          { src: 'icons/icon-96.webp', sizes: '96x96', type: 'image/webp' },
          { src: 'icons/icon-128.webp', sizes: '128x128', type: 'image/webp' },
          { src: 'icons/icon-192.webp', sizes: '192x192', type: 'image/webp', purpose: 'any maskable' },
          { src: 'icons/icon-256.webp', sizes: '256x256', type: 'image/webp' },
          { src: 'icons/icon-512.webp', sizes: '512x512', type: 'image/webp', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // Le nouveau service worker prend le contrôle immédiatement :
        // les utilisateurs voient la mise à jour dès le rechargement suivant.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firestore-cache',
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
