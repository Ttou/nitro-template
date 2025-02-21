export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemDictDataListDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { dictLabel, isAvailable } = dto

  const data = await em.findAll(SysDictDataEntity,
    {
      where: {
        dictLabel: dictLabel ? { $like: `%${dictLabel}%` } : {},
        isAvailable: isAvailable ? { $eq: isAvailable } : {},
      },
    },
  )

  return data
})
