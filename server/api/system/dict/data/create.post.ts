export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSysDictDataDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysDictDataRepository.create(params)

  return null
})
