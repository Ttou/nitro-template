export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemConfigDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemConfigHandler.create(params)

  return null
})
