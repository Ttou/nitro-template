export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindAllocatedUserPageDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { page, pageSize, ...rest } = dto

  const [data, total] = await em.findAndCount<ISysUserEntity, ISysUserEntityRelationKeys>(SysUserEntityName,
    {
      $and: [
        { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
        { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
        { roles: { id: { $eq: rest.id } } },
      ],
    },
    { limit: pageSize, offset: page - 1, populate: ['roles'] },
  )

  return { page, pageSize, data, total }
})
