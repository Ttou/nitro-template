export default defineNitroPlugin((app) => {
  JwtUtil.initialize({ secret: 'abc', signOptions: {} })
})
