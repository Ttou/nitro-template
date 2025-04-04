import swc from '@rollup/plugin-swc'

export default defineNitroConfig({
  preset: 'node-server',
  srcDir: './server',
  output: {
    dir: './dist',
  },
  imports: {
    dirs: [
      './server/core/**',
      './shared/**',
    ],
  },
  errorHandler: '~/error',
  runtimeConfig: {},
  experimental: {
    asyncContext: true,
  },
  rollupConfig: {
    plugins: [
      swc(),
    ],
  },
  sourceMap: false,
  compatibilityDate: '2024-11-05',
})
