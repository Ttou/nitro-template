export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateRoleDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.roleRepository.update(params)

  return null
})
