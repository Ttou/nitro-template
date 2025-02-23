export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, AssignMenuDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const role = await em.findOne(SysRoleEntity, {
    id: { $eq: dto.id },
  }, { populate: ['menus'] })

  const menus = await em.find(SysMenuEntity, {
    id: { $in: dto.menuIds },
  })

  role.menus.removeAll()

  for (const menu of menus) {
    role.menus.add(menu)
  }

  await em.persist(role).flush()

  return null
})
