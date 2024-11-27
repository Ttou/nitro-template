export default defineNitroConfig({
  srcDir: './server',
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
