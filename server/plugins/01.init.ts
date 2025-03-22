import { joinURL } from 'ufo'

export default defineNitroPlugin(async (app) => {
  keepQueueFiles()
  keepServiceFiles()

  await initService()

  logger.info(`应用接口地址: ${joinURL('http://localhost:3000', 'api')}`)
})
