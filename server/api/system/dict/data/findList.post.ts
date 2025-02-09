export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemDictDataListDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { dictLabel, isAvailable } = dto

  const data = await em.findAll<SysDictDataEntityType>(SysDictDataEntityName,
    {
      where: {
        dictLabel: dictLabel ? { $like: `%${dictLabel}%` } : {},
        isAvailable: isAvailable ? { $eq: isAvailable } : {},
      },
    },
  )

  return data
})
