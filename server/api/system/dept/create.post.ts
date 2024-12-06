export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysDeptDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDeptRepository.create(params)

  return null
})
