export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemMenuDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { menuKey } = dto

  const oldRecord = await em.findOne<ISysMenuEntity>(EntityNameEnum.SysMenu,
    {
      menuKey: { $eq: menuKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`菜单标识 ${menuKey} 已存在`)
  }

  const newRecord = em.create<ISysMenuEntity>(EntityNameEnum.SysMenu, dto)

  await em.persist(newRecord).flush()

  return null
})
