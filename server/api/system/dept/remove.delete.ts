export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { ids } = dto

  const oldRecords = await em.find<ISysDeptEntity>(sysDeptEntity.name,
    {
      id: { $in: ids },
    },
  )

  await em.remove(oldRecords).flush()

  return null
})
