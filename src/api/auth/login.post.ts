defineRouteMeta({
  openAPI: {
    tags: ['鉴权接口'],
    summary: '登录',
  },
})

export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const data = ValidateUtil.parseResult(res)

  const user = await UserModel.findByUsername(data.username)

  if (!user) {
    throw ErrorUtil.badRequest('用户不存在')
  }

  const isMatch = await HashUtil.compare(data.password, user.password)

  if (!isMatch) {
    throw ErrorUtil.badRequest('账号或密码错误')
  }

  const token = await JwtUtil.sign({ sub: user.id })

  return token
})
