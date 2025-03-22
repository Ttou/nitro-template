import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDictTypeDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, dictType, ...rest } = dto

  const oldRecord = await em.findOne<ISysDictTypeEntity>(sysDictTypeEntity.name,
    {
      $and: [
        { id: { $eq: id } },
        { dictType: { $eq: dictType } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest(`字典类型 ${dto.dictType} 不存在`)
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
