export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSysConfigPageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysPostRepository.findPage(params)
})
