export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateConfigDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.configRepository.update(params)

  return null
})
