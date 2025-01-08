export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemRoleDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemRoleHandler.create(params)

  return null
})
