export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemRoleDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { roleKey } = dto

  const oldRecord = await em.findOne<ISysRoleEntity>(EntityNameEnum.SysRole,
    {
      roleKey: { $eq: roleKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`角色标识 ${roleKey} 已存在`)
  }

  const config = em.create<ISysRoleEntity>(EntityNameEnum.SysRole, dto)

  await em.persist(config).flush()

  return null
})
