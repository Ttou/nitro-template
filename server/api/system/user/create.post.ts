export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemUserDto.safeParse)
  const dto = parseValidateResult(result)

  const { hashService } = event.context.scope.cradle
  const em = useEM()

  const { userName, email } = dto

  const oldRecord = await em.findOne(SysUserEntity,
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
  const newRecord = em.create(SysUserEntity, { ...dto, isDelete: YesOrNo.enum.NO, password })
  await em.persist(newRecord).flush()

  return null
})
