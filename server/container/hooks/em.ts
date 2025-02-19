export function useEM() {
  const event = useEvent()

  const { ormService, reqId } = event.context.scope.cradle

  const em = ormService.em.fork({ loggerContext: { reqId } })

  return em
}
