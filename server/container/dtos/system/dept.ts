import { z } from 'zod'

export const FindDeptListDto = z.object({
  deptName: z.string().optional(),
  deptKey: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
})

export type FindDeptListDtoType = z.infer<typeof FindDeptListDto>

export const CreateDeptDto = z.object({
  deptName: z.string({ required_error: '部门名称不能为空' }),
  deptKey: z.string({ required_error: '部门标识不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateDeptDtoType = z.infer<typeof CreateDeptDto>

export const UpdateDeptDto = CreateDeptDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateDeptDtoType = z.infer<typeof UpdateDeptDto>
