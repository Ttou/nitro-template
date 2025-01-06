import { z } from 'zod'

export const FindSystemConfigByKeyDto = z.object({
  configKey: z.string({ required_error: '参数键名不能为空' }),
})

export type FindSystemConfigByKeyDtoType = z.infer<typeof FindSystemConfigByKeyDto>

export const FindSystemConfigPageDto = PageDto.extend({
  configName: z.string().optional(),
  configKey: z.string().optional(),
  isBuiltin: z.nativeEnum(YesOrNo.enum).optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSystemConfigPageDtoType = z.infer<typeof FindSystemConfigPageDto>

export const CreateSystemConfigDto = z.object({
  configName: z.string({ required_error: '参数名称不能为空' }),
  configKey: z.string({ required_error: '参数标识不能为空' }),
  configValue: z.string({ required_error: '参数键值不能为空' }),
  isBuiltin: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否内置格式不正确' }).optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSystemConfigDtoType = z.infer<typeof CreateSystemConfigDto>

export const UpdateSystemConfigDto = CreateSystemConfigDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSystemConfigDtoType = z.infer<typeof UpdateSystemConfigDto>
