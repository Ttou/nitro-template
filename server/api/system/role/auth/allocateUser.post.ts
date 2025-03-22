export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, AllocateUserDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, ids } = dto

  const role = await em.findOne<ISysRoleEntity>(sysRoleEntity.name,
    {
      id: { $eq: id },
    },
  )
  const users = await em.find<ISysUserEntity, ISysUserEntityRelationKeys>(sysUserEntity.name,
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
