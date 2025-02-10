import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemUserDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { id, userName, ...rest } = dto

  const oldRecord = await em.findOne<ISysUserEntity>(SysUserEntityName, {
    $and: [
      { id: { $eq: id } },
      { userName: { $eq: userName } },
    ],
  })

  if (!oldRecord) {
    throw badRequest('用户不存在')
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
