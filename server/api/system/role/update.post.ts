import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemRoleDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, roleKey, ...rest } = dto

  const oldRecord = await em.findOne(SysRoleEntity,
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
