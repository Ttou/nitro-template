const { CacheInterceptorRequest, CacheInterceptorResponse } = CacheInterceptor({
  key: 'sys_dict',
  ttl: 60 * 60 * 24,
  cb: opts => `${opts.key}:${getQuery(opts.event).dictType}`,
})

export default defineEventHandler({
  onRequest: [AuthenticationGuard(), CacheInterceptorRequest()],
  onBeforeResponse: [CacheInterceptorResponse()],
  handler: async (event) => {
    const result = await getValidatedQuery(event, FindSystemDictDetailByKeyDto.safeParse)
    const dto = parseValidateResult(result)
    const em = useEM()

    const data = await em.findAll(SysDictDataEntity,
      {
        where: {
          dictType: { $eq: dto.dictType },
          isAvailable: { $eq: YesOrNoDict.enum.YES },
        },
      },
    )

    return data
  },
})
