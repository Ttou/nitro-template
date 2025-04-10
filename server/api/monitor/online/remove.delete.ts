export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.monitor.online.remove')],
  handler: async (event) => {
    const result = await readValidatedBody(event, RemoveDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { ids } = dto

    const oldRecords = await em.find(SysOnlineEntity,
      {
        id: { $in: ids },
      },
    )

    await em.remove(oldRecords).flush()

    for (const record of oldRecords) {
      await diContainer.cradle.jwtService.addToLogout(record.token)
    }

    return null
  },
})
