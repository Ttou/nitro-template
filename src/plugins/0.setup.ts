export default defineNitroPlugin((app) => {
  const config = useRuntimeConfig()

  JwtUtil.initialize(config.jwt)
})
