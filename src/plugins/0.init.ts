export default defineNitroPlugin(async (app) => {
  await Config.init()

  await Promise.all([JWT.init(), ORM.init(), Hash.init()])
})
