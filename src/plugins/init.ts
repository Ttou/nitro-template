export default defineNitroPlugin(async (app) => {
  app.hooks.hookOnce('close', async () => {})
})
