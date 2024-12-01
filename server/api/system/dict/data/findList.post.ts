export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindDictDataListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.dictDataRepository.findList(params)
})
