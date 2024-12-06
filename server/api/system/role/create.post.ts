export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysRoleDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysRoleRepository.create(params)

  return null
})
