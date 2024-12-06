export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSysDeptListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysDeptRepository.findList(params)
})
