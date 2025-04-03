export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
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
