import { asValue } from 'awilix'
import { EventHandlerRequest, H3Error, H3Event } from 'h3'

export default defineNitroPlugin((app) => {
  // 接口请求
  const isApi = ({ path }: H3Event<EventHandlerRequest>) => {
    return path.startsWith('/api/')
  }

  app.hooks.hook('request', (event) => {
    if (isApi(event)) {
      event.context.scope = diContainer.createScope()

      event.context.scope.register({
        reqId: asValue(diContainer.cradle.idService.v4()),
        reqStartTime: asValue(performance.now()),
      })

      event.context.scope.cradle.loggerService.info('Request received', {
        reqId: event.context.scope.cradle.reqId,
        reqUrl: event.path,
        reqMethod: event.method,
      })
    }
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    if (isApi(event)) {
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
        reqUrl: event.path,
        reqMethod: event.method,
      })
    }
  })

  app.hooks.hook('error', (error: H3Error, { event }) => {
    diContainer.cradle.loggerService.error(error.stack)
  })

  app.hooks.hookOnce('close', async () => {
    await disposeContainer()
  })
})
