import { EventHandlerRequest, H3Error, H3Event } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    reqId: string
    reqStartTime: number
    currentUser: SysUserEntity
  }
}

export default defineNitroPlugin((app) => {
  // 接口请求
  const isApi = ({ path }: H3Event<EventHandlerRequest>) => {
    return path.startsWith('/api/')
  }

  app.hooks.hook('request', (event) => {
    if (isApi(event)) {
      event.context.reqId = uuidv4()
      event.context.reqStartTime = performance.now()

      logger.info('Request received', {
        reqId: event.context.reqId,
        reqUrl: event.path,
        reqMethod: event.method,
      })
    }
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    // 接口请求
    if (isApi(event)) {
      const { reqId, reqStartTime } = event.context

      const reqTime = Math.round((performance.now() - reqStartTime) * 1000) / 1000

      response.body = {
        success: true,
        code: getResponseStatus(event),
        msg: 'ok',
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
