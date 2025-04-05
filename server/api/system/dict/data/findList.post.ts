export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.dictData.findList')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemDictDataListDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { dictType, dictLabel, isAvailable } = dto

    const data = await em.findAll(SysDictDataEntity,
      {
        where: {
          dictType: { $eq: dictType },
          dictLabel: dictLabel ? { $like: `%${dictLabel}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  },
})
