export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { ids } = dto

  const oldRecords = await em.find(SysConfigEntity,
    {
      id: { $in: ids },
      isBuiltin: { $eq: YesOrNoDict.enum.NO },
    },
  )

  await em.remove(oldRecords).flush()

  return null
})
