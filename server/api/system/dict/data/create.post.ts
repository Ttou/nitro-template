export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDictDataDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemDictDataHandler.create(params)

  return null
})
