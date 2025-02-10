export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, AllocateUserDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { id, ids } = dto

  const role = await em.findOne<ISysRoleEntity>(SysRoleEntityName,
    {
      id: { $eq: id },
    },
  )
  const users = await em.find<ISysUserEntity, ISysUserEntityRelationKeys>(SysUserEntityName,
    {
      id: { $in: ids },
    },
    { populate: ['roles'] },
  )

  for (const user of users) {
    user.roles.add(role)
  }

  await em.persist(users).flush()

  return null
})
