export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemMenuListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.systemMenuHandler.findList(params)
})
