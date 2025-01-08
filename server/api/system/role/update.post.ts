export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemRoleDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemRoleHandler.update(params)

  return null
})
