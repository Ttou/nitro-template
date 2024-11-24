export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindConfigPageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.configRepository.findPage(params)
})
