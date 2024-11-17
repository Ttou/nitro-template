defineRouteMeta({
  openAPI: {
    tags: ['鉴权接口'],
    summary: '登录',
    requestBody: {
      content: {
        'application/json': {
          schema: LoginDtoSchema,
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const data = diContainer.cradle.validateService.parseResult(res)

  const user = await diContainer.cradle.userRepository.findByUsername(data.username)

  if (!user) {
    throw badRequest('用户不存在')
  }

  const isMatch = await diContainer.cradle.hashService.compare(data.password, user.password)

  if (!isMatch) {
    throw badRequest('账号或密码错误')
  }

  const token = await diContainer.cradle.jwtService.sign({ sub: user.id })

  return token
})
