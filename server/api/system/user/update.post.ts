import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemUserDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, userName, ...rest } = dto

  const oldRecord = await em.findOne<ISysUserEntity>(sysUserEntity.name,
    {
      $and: [
        { id: { $eq: id } },
        { userName: { $eq: userName } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest('用户不存在')
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
