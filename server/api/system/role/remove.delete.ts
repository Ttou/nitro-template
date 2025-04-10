export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.role.remove')],
  handler: async (event) => {
    const result = await readValidatedBody(event, RemoveDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { ids } = dto

    const oldRecords = await em.find(SysRoleEntity,
      {
        id: { $in: ids },
      },
    )

    await em.remove(oldRecords).flush()

    return null
  },
})
