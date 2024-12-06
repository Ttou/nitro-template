export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysPostDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysPostRepository.create(params)

  return null
})
