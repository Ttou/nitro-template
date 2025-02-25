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
        reqId: asValue(uuidv4()),
        reqStartTime: asValue(performance.now()),
      })

      logger.info('Request received', {
        reqId: event.context.scope.cradle.reqId,
        reqUrl: event.path,
        reqMethod: event.method,
      })
    }
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    if (isApi(event)) {
      const { reqId, reqStartTime } = event.context.scope.cradle

      const reqTime = Math.round((performance.now() - reqStartTime) * 1000) / 1000

      response.body = {
        success: true,
        code: getResponseStatus(event),
        msg: null,
        data: response.body,
      }

      logger.info('Request completed', {
        reqId,
        reqTime,
        reqUrl: event.path,
        reqMethod: event.method,
      })
    }
  })

  app.hooks.hook('error', (error: H3Error, { event }) => {
    logger.error(error.stack)
  })

  app.hooks.hookOnce('close', async () => {
    await disposeContainer()
  })
})
