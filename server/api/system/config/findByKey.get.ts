export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindConfigByKeyDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.configRepository.findByKey(params)
})
