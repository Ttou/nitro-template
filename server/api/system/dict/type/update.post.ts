export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSysDictTypeDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDictTypeRepository.update(params)

  return null
})
