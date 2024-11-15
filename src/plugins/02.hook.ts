import { asValue } from 'awilix'
import { H3Error } from 'h3'

export default defineNitroPlugin((app) => {
  app.hooks.hook('request', (event) => {
    event.context.scope = diContainer.createScope()

    event.context.scope.register({
      reqId: asValue(diContainer.cradle.idService.v4()),
      reqStartTime: asValue(performance.now()),
    })

    event.context.scope.cradle.loggerService.info('Request received', {
      reqId: event.context.scope.cradle.reqId,
    })
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    const { reqId, reqStartTime, loggerService } = event.context.scope.cradle

    const reqTime = Math.round((performance.now() - reqStartTime) * 1000) / 1000

    response.body = {
      success: true,
      code: getResponseStatus(event),
      message: getResponseStatusText(event),
      data: response.body,
    }

    loggerService.info('Request completed', {
      reqId,
      reqTime,
    })
  })

  app.hooks.hook('error', (error: H3Error, { event }) => {
    diContainer.cradle.loggerService.error(error.stack)
  })

  app.hooks.hookOnce('close', async () => {
    await disposeContainer()
  })
})
