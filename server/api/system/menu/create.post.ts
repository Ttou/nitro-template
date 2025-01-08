export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemMenuDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemMenuHandler.create(params)

  return null
})
