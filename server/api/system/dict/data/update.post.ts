import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDictDataDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { id, dictValue, ...rest } = dto

  const oldRecord = await em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
    {
      $and: [
        { id: { $eq: id } },
        { dictValue: { $eq: dictValue } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest(`字典值 ${dto.dictValue} 不存在`)
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
