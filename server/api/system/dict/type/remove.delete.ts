export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { ids } = dto

  const oldDictTypeRecords = await em.find<ISysDictTypeEntity>(sysDictTypeEntity.name,
    {
      id: { $in: ids },
    },
  )

  const oldDictDataRecords = await em.find<ISysDictDataEntity>(sysDictDataEntity.name,
    {
      dictType: { $in: oldDictTypeRecords.map(item => item.dictType) },
    },
  )

  await em.remove([].concat(oldDictTypeRecords, oldDictDataRecords)).flush()

  return null
})
