export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { ids } = dto

  const oldRecords = await em.find<ISysDeptEntity>(SysDeptEntityName,
    {
      id: { $in: ids },
    },
  )

  await em.remove(oldRecords).flush()

  return null
})
