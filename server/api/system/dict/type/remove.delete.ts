export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { ids } = dto

  const oldDictTypeRecords = await em.find<SysDictTypeEntityType>(SysDictTypeEntityName,
    {
      id: { $in: ids },
    },
  )

  const oldDictDataRecords = await em.find<SysDictDataEntityType>(SysDictDataEntityName,
    {
      dictType: { $in: oldDictTypeRecords.map(item => item.dictType) },
    },
  )

  await em.remove([].concat(oldDictTypeRecords, oldDictDataRecords)).flush()

  return null
})
