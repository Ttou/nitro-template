export function useEM(reqId?: string) {
  if (!reqId) {
    const event = useEvent()
    reqId = event.context.reqId
  }

  const em = diContainer.cradle.ormService.em.fork({ loggerContext: { reqId } })

  return em
}
