export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindAssignedMenuDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const role = await em.findOne<ISysRoleEntity, ISysRoleEntityRelationKeys>(sysRoleEntity.name,
    {
      id: { $eq: dto.id },
    },
    { populate: ['menus'] },
  )

  return role.menus.map(v => String(v.id))
})
