export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUserPageDto.safeParse)

  const data = ValidateUtil.parseResult(result)

  const [list, total] = await UserModel.findPage(data)

  return {
    page: data.page,
    size: data.size,
    total,
    list,
  }
})
