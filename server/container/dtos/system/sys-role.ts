import { z } from 'zod'

export const FindSysRolePageDto = PageDto.extend({
  roleName: z.string().optional(),
  roleKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSysRolePageDtoType = z.infer<typeof FindSysRolePageDto>

export const CreateSysRoleDto = z.object({
  roleName: z.string({ required_error: '角色名称不能为空' }),
  roleKey: z.string({ required_error: '角色标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysRoleDtoType = z.infer<typeof CreateSysRoleDto>

export const UpdateSysRoleDto = CreateSysRoleDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateSysRoleDtoType = z.infer<typeof UpdateSysRoleDto>

export const FindAllocatedPageDto = PageDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type FindAllocatedPageDtoType = z.infer<typeof FindAllocatedPageDto>
