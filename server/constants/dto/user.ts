import { z } from 'zod'

export const FindUserByIdDto = z.object({
  id: z.string({ required_error: 'id不能为空' }).min(1, 'id不能为空').transform(Number),
})

export const FindUserPageDto = PageDto.extend({
  username: z.string().optional(),
  nickname: z.string().optional(),
})

export type FindUserPageDtoType = z.infer<typeof FindUserPageDto>
