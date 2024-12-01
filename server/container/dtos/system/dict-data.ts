import { z } from 'zod'

export const FindDictDataListDto = z.object({
  dictLabel: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
})

export type FindDictDataListDtoType = z.infer<typeof FindDictDataListDto>

export const CreateDictDataDto = z.object({
  dictLabel: z.string({ required_error: '字典标签不能为空' }),
  dictValue: z.string({ required_error: '字典值不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().optional(),
})

export type CreateDictDataDtoType = z.infer<typeof CreateDictDataDto>

export const UpdateDictDataDto = CreateDictDataDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateDictDataDtoType = z.infer<typeof UpdateDictDataDto>
