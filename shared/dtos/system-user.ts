import { z } from 'zod'

export const FindSystemUserByIdDto = z.object({
  id: z.string({ required_error: 'id不能为空' }).min(1, 'id不能为空').transform(BigInt),
})

export const FindSystemUserPageDto = PageDto.extend({
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type FindSystemUserPageDtoType = z.infer<typeof FindSystemUserPageDto>

export const CreateSystemUserDto = z.object({
  userName: z.string({ required_error: '用户名不能为空' }),
  nickName: z.string({ required_error: '昵称不能为空' }),
  password: z.string({ required_error: '密码不能为空' }),
  email: z.string().email({ message: '邮箱格式不正确' }).optional(),
  phone: z.string().nullable().optional(),
  sex: z.nativeEnum(Sex.enum, { invalid_type_error: '性别参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
  isDelete: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否删除参数格式不正确' }).optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
})

export type CreateSystemUserDtoType = z.infer<typeof CreateSystemUserDto>

export const UpdateSystemUserDto = CreateSystemUserDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSystemUserDtoType = z.infer<typeof UpdateSystemUserDto>
