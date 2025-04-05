import { Job } from 'bullmq'

interface IOnlineData {
  tokenId: string
  token: string
  user: SysUserEntity
  reqUa: string
  reqIp: string
  reqId: string
}

export class OnlineQueue extends BaseQueue {
  public static queueName = 'ONLINE_QUEUE'

  constructor(opts?: Omit<IBaseQueueOptions, 'processor'>) {
    super({
      processor: async (job: Job<IOnlineData>) => {
        const { tokenId, token, user, reqUa, reqIp, reqId } = job.data

        const usResult = parseUa(reqUa)
        const ipResult = await parseIp(reqIp)

        const em = useEM(reqId)

        const online = em.create(SysOnlineEntity, {
          tokenId,
          token,
          browser: [usResult.browser.name, usResult.browser.version].join(' '),
          os: [usResult.os.name, usResult.os.version].join(' '),
          ip: ipResult.ip,
          location: ipResult.location,
          loginTime: new Date(),
        })

        online.user = user

        try {
          await em.persist(online).flush()
        }
        catch (error) {
          console.error(error)
        }
      },
      ...(opts ?? {}),
    })
  }
}
