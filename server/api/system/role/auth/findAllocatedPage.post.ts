export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindAllocatedPageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.roleRepository.findAllocatedPage(params)
})
