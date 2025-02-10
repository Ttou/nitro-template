import { z } from 'zod'

export const FindSystemDeptListDto = z.object({
  deptName: z.string().optional(),
  deptKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
})

export type IFindSystemDeptListDto = z.infer<typeof FindSystemDeptListDto>

export const CreateSystemDeptDto = z.object({
  parentId: z.union([z.string(), z.number()]).optional().transform(val => val ? BigInt(val) : null),
  deptName: z.string({ required_error: '部门名称不能为空' }),
  deptKey: z.string({ required_error: '部门标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemDeptDto = z.infer<typeof CreateSystemDeptDto>

export const UpdateSystemDeptDto = CreateSystemDeptDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemDeptDto = z.infer<typeof UpdateSystemDeptDto>
