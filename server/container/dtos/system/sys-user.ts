import { z } from 'zod'

export const FindSysUserByIdDto = z.object({
  id: z.string({ required_error: 'id不能为空' }).min(1, 'id不能为空').transform(Number),
})

export const FindSysUserPageDto = PageDto.extend({
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type FindSysUserPageDtoType = z.infer<typeof FindSysUserPageDto>
