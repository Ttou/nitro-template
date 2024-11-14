import { asValue } from 'awilix'

export default defineNitroPlugin((app) => {
  app.hooks.hook('request', (event) => {
    event.context.scope = diContainer.createScope()

    event.context.scope.register({
      reqId: asValue(diContainer.cradle.idService.v4()),
      reqStartTime: asValue(performance.now()),
    })
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    const { reqId, reqStartTime } = event.context.scope.cradle

    const reqTime = Math.round((performance.now() - reqStartTime) * 1000) / 1000

    console.log('reqId', reqId)
    console.log('reqTime', reqTime)

    diContainer.cradle.cacheService.set(`req:${reqId}`, 11)

    response.body = {
      success: true,
      status: getResponseStatus(event),
      message: getResponseStatusText(event),
      data: response.body,
    }
  })

  app.hooks.hookOnce('close', async () => {
    console.log('Closing nitro server...')
    await disposeContainer()

    console.log('Task is done!')
  })
})
