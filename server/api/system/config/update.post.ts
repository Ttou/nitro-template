export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemConfigDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemConfigHandler.update(params)

  return null
})
