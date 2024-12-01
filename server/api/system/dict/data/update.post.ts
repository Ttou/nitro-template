export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateDictDataDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.dictDataRepository.update(params)

  return null
})
