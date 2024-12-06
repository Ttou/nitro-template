export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDictTypeRepository.remove(params)

  return null
})
