export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.role.create')],
  handler: async (event) => {
    const result = await readValidatedBody(event, CreateSystemRoleDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { roleKey } = dto

    const oldRecord = await em.findOne(SysRoleEntity,
      {
        roleKey: { $eq: roleKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`角色标识 ${roleKey} 已存在`)
    }

    const config = em.create(SysRoleEntity, dto)

    await em.persist(config).flush()

    return null
  },
})
