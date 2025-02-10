import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateCurrentUserPasswordDto.safeParse)
  const dto = parseValidateResult(result)

  const { currentUser, hashService, ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { oldPassword, newPassword } = dto

  const isMatch = await hashService.compare(oldPassword, currentUser.password)

  if (!isMatch) {
    throw badRequest('旧密码错误')
  }

  const oldRecord = await em.findOne<ISysUserEntity>(SysUserEntityName, {
    $and: [
      { id: { $eq: currentUser.id } },
      { userName: { $eq: currentUser.userName } },
    ],
  })

  if (!oldRecord) {
    throw badRequest('用户不存在')
  }

  const password = await hashService.hash(newPassword)

  wrap(oldRecord).assign({ password })

  await em.persist(oldRecord).flush()

  return null
})
