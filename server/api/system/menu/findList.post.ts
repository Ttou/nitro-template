export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemMenuListDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { menuName, menuKey, isAvailable } = dto

  const data = await em.findAll<ISysMenuEntity>(EntityNameEnum.SysMenu,
    {
      where: {
        menuName: menuName ? { $like: `%${menuName}%` } : {},
        menuKey: menuKey ? { $like: `%${menuKey}%` } : {},
        isAvailable: isAvailable ? { $eq: isAvailable } : {},
      },
    },
  )

  return data
})
