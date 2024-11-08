export default defineNitroPlugin(async (app) => {
  await useConfig()

  await Promise.all([useJwt(), useOrm()])
})
