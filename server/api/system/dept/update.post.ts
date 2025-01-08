export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDeptDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemDeptHandler.update(params)

  return null
})
