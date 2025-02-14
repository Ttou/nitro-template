export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUnallocatedUserPageDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { page, pageSize, ...rest } = dto

  const allocatedUsers = await em.find<ISysUserEntity, ISysUserEntityRelationKeys>(EntityNameEnum.SysUser,
    {
      roles: { id: { $eq: rest.id } },
    },
  )

  const [data, total] = await em.findAndCount<ISysUserEntity, ISysUserEntityRelationKeys>(EntityNameEnum.SysUser,
    {
      $and: [
        { id: { $nin: allocatedUsers.map(item => item.id) } },
        { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
        { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
      ],
    },
    { limit: pageSize, offset: page - 1, populate: ['roles'] },
  )

  return { page, pageSize, data, total }
})
