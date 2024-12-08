import { z } from 'zod'

export const FindSysDictDataListDto = z.object({
  dictLabel: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
})

export type FindSysDictDataListDtoType = z.infer<typeof FindSysDictDataListDto>

export const CreateSysDictDataDto = z.object({
  dictLabel: z.string({ required_error: '字典标签不能为空' }),
  dictValue: z.string({ required_error: '字典值不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysDictDataDtoType = z.infer<typeof CreateSysDictDataDto>

export const UpdateSysDictDataDto = CreateSysDictDataDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSysDictDataDtoType = z.infer<typeof UpdateSysDictDataDto>
