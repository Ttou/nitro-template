export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.menu.create')],
  handler: async (event) => {
    const result = await readValidatedBody(event, CreateSystemMenuDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { menuKey } = dto

    const oldRecord = await em.findOne(SysMenuEntity,
      {
        menuKey: { $eq: menuKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`菜单标识 ${menuKey} 已存在`)
    }

    const newRecord = em.create(SysMenuEntity, dto)

    await em.persist(newRecord).flush()

    return null
  },
})
