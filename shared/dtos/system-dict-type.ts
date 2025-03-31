import { z } from 'zod'

export const FindSystemDictTypePageDto = PageDto.extend({
  dictName: z.string().optional(),
  dictType: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNoDict.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type IFindSystemDictTypePageDto = z.infer<typeof FindSystemDictTypePageDto>

export const CreateSystemDictTypeDto = z.object({
  dictName: z.string({ required_error: '字典名称不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.nativeEnum(YesOrNoDict.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemDictTypeDto = z.infer<typeof CreateSystemDictTypeDto>

export const UpdateSystemDictTypeDto = CreateSystemDictTypeDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemDictTypeDto = z.infer<typeof UpdateSystemDictTypeDto>
