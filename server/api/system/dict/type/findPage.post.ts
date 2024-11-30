export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindDictTypePageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.dictTypeRepository.findPage(params)
})
