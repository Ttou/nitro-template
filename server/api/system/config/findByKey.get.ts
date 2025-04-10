export default defineLazyEventHandler(() => {
  const { CacheInterceptorRequest, CacheInterceptorResponse } = useCacheInterceptor({
    key: 'sys_config',
    ttl: 60 * 60 * 24,
    cb: opts => `${opts.key}:${getQuery(opts.event).configKey}`,
  })

  return defineEventHandler({
    onRequest: [useAuthentication(), CacheInterceptorRequest()],
    onBeforeResponse: [CacheInterceptorResponse()],
    handler: async (event) => {
      const result = await getValidatedQuery(event, FindSystemConfigByKeyDto.safeParse)
      const dto = parseValidateResult(result)

      const em = useEM()

      const { configKey } = dto

      const oldRecord = await em.findOne(SysConfigEntity,
        {
          configKey: { $eq: configKey },
        },
      )

      if (!oldRecord) {
        throw badRequest(`配置标识 ${configKey} 不存在`)
      }

      return oldRecord
    },
  })
})
