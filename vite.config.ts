import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: './web/public',
  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
  plugins: [
    VueJsx(),
    AutoImport({
      dts: './web/types/auto-imports.d.ts',
      dirs: [
        './shared/**',
        './web/apis/**',
        './web/router/**',
        './web/store/**',
        './web/utils/**',
      ],
      imports: [
        {
          // createApp 的类型会和 h3 冲突，所以这里排除掉
          imports: ['computed', 'h', 'ref', 'unref', 'defineComponent'],
          from: 'vue',
        },
        {
          // createRouter 的类型会和 h3 冲突，所以这里排除掉
          imports: ['RouterView', 'createWebHistory', 'useRoute', 'useRouter'],
          from: 'vue-router',
        },
        {
          imports: ['createPinia', 'defineStore'],
          from: 'pinia',
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/',
      },
    },
  },
})
