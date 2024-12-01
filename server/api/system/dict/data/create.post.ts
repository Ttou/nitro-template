export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateDictDataDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.dictDataRepository.create(params)

  return null
})
