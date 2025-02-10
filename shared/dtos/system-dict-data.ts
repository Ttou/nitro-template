import { z } from 'zod'

export const FindSystemDictDataListDto = z.object({
  dictLabel: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
})

export type IFindSystemDictDataListDto = z.infer<typeof FindSystemDictDataListDto>

export const CreateSystemDictDataDto = z.object({
  dictLabel: z.string({ required_error: '字典标签不能为空' }),
  dictValue: z.string({ required_error: '字典值不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemDictDataDto = z.infer<typeof CreateSystemDictDataDto>

export const UpdateSystemDictDataDto = CreateSystemDictDataDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemDictDataDto = z.infer<typeof UpdateSystemDictDataDto>
