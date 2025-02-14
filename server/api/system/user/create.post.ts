export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemUserDto.safeParse)
  const dto = parseValidateResult(result)

  const { hashService, ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { userName, email } = dto

  const oldRecord = await em.findOne<ISysUserEntity>(EntityNameEnum.SysUser,
    {
      $or: [
        { userName: { $eq: userName } },
        { email: { $eq: email } },
      ],
    },
  )

  if (oldRecord) {
    throw badRequest(`用户名或邮箱已存在`)
  }

  const password = await hashService.hash(dto.password)
  const newRecord = em.create<ISysUserEntity>(EntityNameEnum.SysUser, { ...dto, isDelete: YesOrNo.enum.NO, password })
  await em.persist(newRecord).flush()

  return null
})
