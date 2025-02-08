export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const params = diContainer.cradle.validateService.parseResult(res)

  const user = await diContainer.cradle.ormService.em.fork().findOne<SysUserEntityType>(SysUserEntityName, { userName: params.userName })

  if (!user) {
    throw badRequest('用户不存在')
  }

  const isMatch = await diContainer.cradle.hashService.compare(params.password, user.password)

  if (!isMatch) {
    throw badRequest('账号或密码错误')
  }

  const token = await diContainer.cradle.jwtService.sign({ sub: user.id.toString() })

  return token
})
