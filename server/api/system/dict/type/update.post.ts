export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDictTypeDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemDictTypeHandler.update(params)

  return null
})
