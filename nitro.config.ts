export default defineNitroConfig({
  srcDir: 'src',
  imports: {
    dirs: ['src/constants/**'],
  },
  experimental: {
    asyncContext: true,
  },
})
