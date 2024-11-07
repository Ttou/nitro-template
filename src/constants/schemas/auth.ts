import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string({ required_error: '用户名不能为空' }),
  password: z.string({ required_error: '密码不能为空' }).min(6, '密码最少6位'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
