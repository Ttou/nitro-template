export default defineNitroConfig({
  srcDir: 'src',
  imports: {
    dirs: [
      'src/constants/**',
      'src/container/**',
    ],
  },
  errorHandler: '~/error',
  runtimeConfig: {},
  experimental: {
    asyncContext: true,
    openAPI: true,
  },
  openAPI: {
    meta: {
      title: 'Nitro Template',
      description: '接口文档',
      version: '1.0.0',
    },
    ui: {
      scalar: false,
    },
  },
  compatibilityDate: '2024-11-05',
})
