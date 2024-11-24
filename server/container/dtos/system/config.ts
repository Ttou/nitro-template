import { z } from 'zod'

export const FindConfigByKeyDto = z.object({
  configKey: z.string({ required_error: '参数键名不能为空' }),
})

export type FindConfigByKeyDtoType = z.infer<typeof FindConfigByKeyDto>

export const FindConfigPageDto = PageDto.extend({
  configName: z.string().optional(),
  configKey: z.string().optional(),
  isBuiltin: z.nativeEnum(EntityYesOrNo).optional(),
  beginTime: z.date().optional(),
  endTime: z.date().optional(),
})

export type FindConfigPageDtoType = z.infer<typeof FindConfigPageDto>

export const CreateConfigDto = z.object({
  configName: z.string({ required_error: '参数名称不能为空' }),
  configKey: z.string({ required_error: '参数键名不能为空' }),
  configValue: z.string({ required_error: '参数键值不能为空' }),
  isBuiltin: z.nativeEnum(EntityYesOrNo, { invalid_type_error: '是否内置参数格式不正确' }).optional(),
  remark: z.string().optional(),
})

export type CreateConfigDtoType = z.infer<typeof CreateConfigDto>

export const UpdateConfigDto = CreateConfigDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateConfigDtoType = z.infer<typeof UpdateConfigDto>
