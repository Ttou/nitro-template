export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDeptDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDeptRepository.create(params)

  return null
})
