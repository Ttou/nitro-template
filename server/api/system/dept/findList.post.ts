export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindDeptListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.deptRepository.findList(params)
})
