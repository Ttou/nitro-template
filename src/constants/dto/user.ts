import { z } from 'zod'
import { createSchema } from 'zod-openapi'

export const FindUserByIdDto = z.object({
  id: z.string({ required_error: 'id不能为空' }).min(1, 'id不能为空').transform(Number),
})

export const FindUserPageDto = PageDto.extend({
  username: z.string().optional().openapi({ description: '用户名' }),
  nickname: z.string().optional().openapi({ description: '昵称' }),
})

export const { schema: FindUserPageDtoSchema } = createSchema(FindUserPageDto)

export type FindUserPageDtoType = z.infer<typeof FindUserPageDto>
