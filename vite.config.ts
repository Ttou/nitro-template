import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'web',
  plugins: [
    VueJsx(),
    AutoImport({
      dts: true,
      dirs: ['./src/utils/**'],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
})
