export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemUserPageDto.safeParse)

  const data = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysUserRepository.findPage(data)
})
