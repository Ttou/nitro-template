export default defineNitroConfig({
  srcDir: './server',
  output: {
    dir: './dist',
  },
  imports: {
    dirs: [
      './server/container/**',
      './shared/**',
    ],
  },
  errorHandler: '~/error',
  runtimeConfig: {},
  experimental: {
    asyncContext: true,
  },
  compatibilityDate: '2024-11-05',
})
