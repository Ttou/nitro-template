import { _RequestMiddleware, _ResponseMiddleware, EventHandlerRequest, H3Event } from 'h3'
import { yellowBright } from 'yoctocolors'

interface ICacheOptions {
  key: string
  ttl?: number
  cb?: (opts: Pick<ICacheOptions, 'key'> & { event: H3Event<EventHandlerRequest> }) => string
}

export function CacheInterceptor(options: ICacheOptions) {
  const keyPrefix = 'cache:'

  function CacheInterceptorRequest(): _RequestMiddleware {
    return async function (event) {
      const cacheKey = options.cb ? options.cb({ event, key: options.key }) : options.key

      if (cacheKey) {
        const result = await diContainer.cradle.cacheService.get(`${keyPrefix}${cacheKey}`)

        if (result) {
          logger.debug(`Cache hit - ${yellowBright(cacheKey)}`)

          const payload: any = JSON.stringify({
            success: true,
            code: getResponseStatus(event),
            msg: 'ok',
            data: result,
          })
          event.context.cacheHint = true
          event.respondWith(new Response(payload))
        }
      }
    }
  }

  function CacheInterceptorResponse(): _ResponseMiddleware {
    return async function (req, res) {
      const cacheKey = options.cb ? options.cb({ event: req, key: options.key }) : options.key

      if (cacheKey) {
        if (!req.context.cacheHint) {
          logger.debug(`Cache miss - ${yellowBright(cacheKey)}`)

          await diContainer.cradle.cacheService.set(`${keyPrefix}${cacheKey}`, res.body, options.ttl)
        }
      }
    }
  }

  return {
    CacheInterceptorRequest,
    CacheInterceptorResponse,
  }
}
