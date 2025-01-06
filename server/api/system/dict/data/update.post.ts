export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDictDataDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDictDataRepository.update(params)

  return null
})
