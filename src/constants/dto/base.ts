import { z } from 'zod'

export const PageDto = z.object({
  page: z.string().transform(Number),
  size: z.string().transform(Number),
})
