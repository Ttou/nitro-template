defineRouteMeta({
  openAPI: {
    tags: ['鉴权接口'],
    summary: '登录',
  },
})

export default defineEventHandler(async (event) => {
  const { parseResult } = useValidate()
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const data = parseResult(res)

  const { compare } = await useHash()
  const { findByUsername } = await useUserModel()

  const user = await findByUsername(data.username)

  if (!user) {
    throw createError('用户不存在')
  }

  const isMatch = await compare(data.password, user.password)

  if (!isMatch) {
    throw createError('账号或密码错误')
  }

  const { sign } = await useJwt()
  const token = await sign({ sub: user.id })

  return token
})
