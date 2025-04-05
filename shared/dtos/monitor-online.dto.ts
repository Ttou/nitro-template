import { z } from 'zod'

export const FindMonitorOnlinePageDto = PageDto.extend({
  userName: z.string().optional(),
  nickName: z.string().optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type IFindMonitorOnlinePageDto = z.infer<typeof FindMonitorOnlinePageDto>
