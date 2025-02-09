import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemRoleDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { id, roleKey, ...rest } = dto

  const oldRecord = await em.findOne<SysRoleEntityType>(SysRoleEntityName,
    {
      $and: [
        { id: { $eq: id } },
        { roleKey: { $eq: roleKey } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest(`角色标识 ${roleKey} 不存在`)
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
