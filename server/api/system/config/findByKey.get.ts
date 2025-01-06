export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindSystemConfigByKeyDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysConfigRepository.findByKey(params)
})
