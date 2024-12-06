export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSysRolePageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysRoleRepository.findPage(params)
})
