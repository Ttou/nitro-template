export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateDictTypeDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.dictTypeRepository.create(params)

  return null
})
