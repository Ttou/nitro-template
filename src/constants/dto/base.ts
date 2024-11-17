import { z } from 'zod'

export const PageDto = z.object({
  page: z.string().transform(Number).openapi({ description: '页码', effectType: 'input' }),
  size: z.string().transform(Number).openapi({ description: '页长', effectType: 'input' }),
})
