export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateDictTypeDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.dictTypeRepository.update(params)

  return null
})
