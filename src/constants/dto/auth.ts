import { z } from 'zod'
import { createSchema } from 'zod-openapi'

export const LoginDto = z.object({
  username: z.string({ required_error: '用户名不能为空' }).openapi({ description: '用户名' }),
  password: z.string({ required_error: '密码不能为空' }).min(6, '密码最少6位').openapi({ description: '密码' }),
})

export const { schema: LoginDtoSchema } = createSchema(LoginDto)

export type LoginDtoType = z.infer<typeof LoginDto>
