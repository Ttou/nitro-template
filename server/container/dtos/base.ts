import { z } from 'zod'

export const PageDto = z.object({
  page: z.number().transform(Number),
  pageSize: z.number().transform(Number),
})
