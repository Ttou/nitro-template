export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemMenuDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysMenuRepository.update(params)

  return null
})
