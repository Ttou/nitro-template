import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemMenuDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, menuKey, ...rest } = dto

  const oldRecord = await em.findOne(SysMenuEntity,
    {
      $and: [
        { id: { $eq: id } },
        { menuKey: { $eq: menuKey } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest(`菜单标识 ${menuKey} 不存在`)
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
