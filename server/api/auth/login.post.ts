export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, LoginDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService, hashService, jwtService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { userName, password } = dto

  const oldRecord = await em.fork().findOne<ISysUserEntity>(SysUserEntityName,
    {
      userName: { $eq: userName },
    },
  )

  if (!oldRecord) {
    throw badRequest('用户不存在')
  }

  const isMatch = await hashService.compare(password, oldRecord.password)

  if (!isMatch) {
    throw badRequest('账号或密码错误')
  }

  const token = await jwtService.sign({ sub: oldRecord.id.toString() })

  return token
})
