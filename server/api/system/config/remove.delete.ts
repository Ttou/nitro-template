export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { ids } = dto

  const oldRecords = await em.find<ISysConfigEntity>(SysConfigEntityName,
    {
      id: { $in: ids },
      isBuiltin: { $eq: YesOrNo.enum.NO },
    },
  )

  await em.remove(oldRecords).flush()

  return null
})
