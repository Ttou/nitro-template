export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDeptDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemDeptHandler.create(params)

  return null
})
