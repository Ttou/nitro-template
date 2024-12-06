export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSysDictDataListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysDictDataRepository.findList(params)
})
