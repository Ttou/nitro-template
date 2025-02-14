import { wrap } from '@mikro-orm/core'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemDeptDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { id, deptKey, ...rest } = dto

  const oldRecord = await em.findOne<ISysDeptEntity>(EntityNameEnum.SysDept,
    {
      $and: [
        { id: { $eq: id } },
        { deptKey: { $eq: deptKey } },
      ],
    },
  )

  if (!oldRecord) {
    throw badRequest(`部门标识 ${deptKey} 不存在`)
  }

  wrap(oldRecord).assign(rest)

  await em.persist(oldRecord).flush()

  return null
})
