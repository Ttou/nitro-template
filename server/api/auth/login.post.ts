export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, LoginDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { captchaId, captchaValue, userName, password } = dto

  const isVerify = await diContainer.cradle.captchaService.verify(captchaId, captchaValue)

  if (!isVerify) {
    throw badRequest('验证码错误')
  }

  const oldRecord = await em.findOne(SysUserEntity,
    {
      userName: { $eq: userName },
    },
  )

  if (!oldRecord) {
    throw badRequest('用户不存在')
  }

  const isMatch = await diContainer.cradle.hashService.compare(password, oldRecord.password)

  if (!isMatch) {
    throw badRequest('账号或密码错误')
  }

  const { token, tokenId } = await diContainer.cradle.jwtService.sign({ sub: oldRecord.id.toString() })
  const onlineQueue = diContainer.cradle.bullService.getQueue(OnlineQueue.queueName)

  await onlineQueue.add('', {
    tokenId,
    token,
    user: oldRecord,
    reqUa: getRequestHeader(event, 'user-agent'),
    reqIp: getRequestIP(event),
    reqId: event.context.reqId,
  })

  return token
})
