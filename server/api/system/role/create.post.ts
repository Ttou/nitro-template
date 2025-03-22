export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemRoleDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { roleKey } = dto

  const oldRecord = await em.findOne<ISysRoleEntity>(sysRoleEntity.name,
    {
      roleKey: { $eq: roleKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`角色标识 ${roleKey} 已存在`)
  }

  const config = em.create<ISysRoleEntity>(sysRoleEntity.name, dto)

  await em.persist(config).flush()

  return null
})
