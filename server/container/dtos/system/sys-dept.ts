import { z } from 'zod'

export const FindSysDeptListDto = z.object({
  deptName: z.string().optional(),
  deptKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
})

export type FindSysDeptListDtoType = z.infer<typeof FindSysDeptListDto>

export const CreateSysDeptDto = z.object({
  parentId: z.union([z.string(), z.number()]).transform(Number),
  deptName: z.string({ required_error: '部门名称不能为空' }),
  deptKey: z.string({ required_error: '部门标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysDeptDtoType = z.infer<typeof CreateSysDeptDto>

export const UpdateSysDeptDto = CreateSysDeptDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateSysDeptDtoType = z.infer<typeof UpdateSysDeptDto>
