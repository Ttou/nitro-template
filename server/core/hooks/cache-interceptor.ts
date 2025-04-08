import { _RequestMiddleware, _ResponseMiddleware, EventHandlerRequest, H3Event } from 'h3'
import { yellowBright } from 'yoctocolors'

interface ICacheOptions {
  key: string
  ttl?: number
  cb?: (opts: Pick<ICacheOptions, 'key'> & { event: H3Event<EventHandlerRequest> }) => string
}

/**
 * 缓存键名前缀
 */
export const CACHE_KEY_PREFIX = 'cache:'

export function useCacheInterceptor(options: ICacheOptions) {
  function CacheInterceptorRequest(): _RequestMiddleware {
    return async function (event) {
      const cacheKey = options.cb ? options.cb({ event, key: options.key }) : options.key

      if (cacheKey) {
        const cached = await diContainer.cradle.cacheService.get(`${CACHE_KEY_PREFIX}${cacheKey}`)

        if (cached) {
          logger.debug(`Cache hit - ${yellowBright(cacheKey)}`)

          const payload: any = JSON.stringify({
            success: true,
            code: getResponseStatus(event),
            msg: 'ok',
            data: cached,
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

          await diContainer.cradle.cacheService.set(`${CACHE_KEY_PREFIX}${cacheKey}`, res.body, options.ttl)
        }
      }
    }
  }

  return {
    CacheInterceptorRequest,
    CacheInterceptorResponse,
  }
}
