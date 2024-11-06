export default defineNitroPlugin((app) => {
  const config = useRuntimeConfig()

  console.log('config', config)

  JwtUtil.initialize(config.jwt)
})
