export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSysMenuListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysMenuRepository.findList(params)
})
