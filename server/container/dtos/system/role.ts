import { z } from 'zod'

export const FindRolePageDto = PageDto.extend({
  roleName: z.string().optional(),
  roleKey: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindRolePageDtoType = z.infer<typeof FindRolePageDto>

export const CreateRoleDto = z.object({
  roleName: z.string({ required_error: '角色名称不能为空' }),
  roleKey: z.string({ required_error: '角色标识不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateRoleDtoType = z.infer<typeof CreateRoleDto>

export const UpdateRoleDto = CreateRoleDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateRoleDtoType = z.infer<typeof UpdateRoleDto>

export const FindAllocatedPageDto = PageDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type FindAllocatedPageDtoType = z.infer<typeof FindAllocatedPageDto>
