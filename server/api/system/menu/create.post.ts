export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemMenuDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { menuKey } = dto

  const oldRecord = await em.findOne<ISysMenuEntity>(sysMenuEntity.name,
    {
      menuKey: { $eq: menuKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`菜单标识 ${menuKey} 已存在`)
  }

  const newRecord = em.create<ISysMenuEntity>(sysMenuEntity.name, dto)

  await em.persist(newRecord).flush()

  return null
})
