export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysConfigDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysConfigRepository.create(params)

  return null
})
