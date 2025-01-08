export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemPostDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemPostHandler.create(params)

  return null
})
