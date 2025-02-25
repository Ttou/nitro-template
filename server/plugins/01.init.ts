import { joinURL } from 'ufo'

export default defineNitroPlugin(async (app) => {
  await configureContainer()

  logger.info(`应用接口地址: ${joinURL('http://localhost:3000', 'api')}`)
})
