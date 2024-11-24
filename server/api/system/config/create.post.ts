export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateConfigDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.configRepository.create(params)

  return null
})
