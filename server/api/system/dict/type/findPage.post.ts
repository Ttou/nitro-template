export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemDictTypePageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.systemDictTypeHandler.findPage(params)
})
