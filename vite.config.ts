import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  cacheDir: './.vite',
  publicDir: './web/public',
  build: {
    outDir: './dist/web',
  },
  plugins: [
    VueJsx(),
    AutoImport({
      dirs: [
        './shared/**',
      ],
    }),
    AutoImport({
      dts: './web/types/auto-imports.d.ts',
      dirs: [
        './web/apis/**',
        './web/router/**',
        './web/store/**',
        './web/utils/**',
      ],
      imports: [
        {
          // createApp 的类型会和 h3 冲突，所以这里排除掉
          imports: ['computed', 'h', 'Fragment', 'ref', 'unref', 'defineComponent', 'shallowRef'],
          from: 'vue',
        },
        {
          imports: ['Ref', 'ComputedRef'],
          from: 'vue',
          type: true,
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
        {
          imports: ['PlusPage', 'PlusDialogForm', 'PlusDialog', 'PlusForm', 'PlusLayout'],
          from: 'plus-pro-components',
        },
        {
          imports: ['FieldValues', 'PlusColumn', 'PlusDialogProps', 'PlusFormProps', 'PlusPageInstance', 'PlusPageProps', 'PlusHeaderProps', 'PlusSidebarProps'],
          from: 'plus-pro-components',
          type: true,
        },
      ],
    }),
    Icons(),
    vanillaExtractPlugin(),
  ],
  server: {
    allowedHosts: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/',
      },
    },
  },
})
