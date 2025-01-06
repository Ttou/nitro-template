import { z } from 'zod'

export const PageDto = z.object({
  page: z.number().transform(Number),
  pageSize: z.number().transform(Number),
})

export const RemoveDto = z.object({
  ids: z.array(z.union([z.string(), z.number()])),
})

export type RemoveDtoType = z.infer<typeof RemoveDto>
