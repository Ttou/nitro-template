export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysMenuDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysMenuRepository.create(params)

  return null
})
