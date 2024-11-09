export default defineNitroPlugin(async (app) => {
  await ConfigUtil.init()

  await Promise.all([JwtUtil.init(), OrmUtil.init(), HashUtil.init()])
})
