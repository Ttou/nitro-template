import { z } from 'zod'

export const FindSystemUserByIdDto = z.object({
  id: z.string({ required_error: 'id不能为空' }).min(1, 'id不能为空').transform(BigInt),
})

export const FindSystemUserPageDto = PageDto.extend({
  userName: z.string().optional(),
  nickName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  sex: z.enum(sexEnum.values as [ISexEnum], { invalid_type_error: '性别参数格式不正确' }).optional(),
  isAvailable: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否可用参数格式不正确' }).optional(),
})

export type IFindSystemUserPageDto = z.infer<typeof FindSystemUserPageDto>

export const CreateSystemUserDto = z.object({
  userName: z.string({ required_error: '用户名不能为空' }),
  nickName: z.string({ required_error: '昵称不能为空' }),
  password: z.string({ required_error: '密码不能为空' }),
  email: z.string().email({ message: '邮箱格式不正确' }).optional(),
  phone: z.string().nullable().optional(),
  sex: z.enum(sexEnum.values as [ISexEnum], { invalid_type_error: '性别参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
  isDelete: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否删除参数格式不正确' }).optional(),
  isAvailable: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否可用参数格式不正确' }).optional(),
})

export type ICreateSystemUserDto = z.infer<typeof CreateSystemUserDto>

export const UpdateSystemUserDto = CreateSystemUserDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemUserDto = z.infer<typeof UpdateSystemUserDto>
