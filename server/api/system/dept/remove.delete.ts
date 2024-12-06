export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, RemoveDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDeptRepository.remove(params)

  return null
})
