export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.roleMenu.assigned')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindAssignedMenuForRoleDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const role = await em.findOne(SysRoleEntity,
      {
        id: { $eq: dto.id },
      },
      { populate: ['menus'] },
    )

    return role.menus.map(v => String(v.id))
  },
})
