import { EntitySchema } from '@mikro-orm/core'

export interface ISysOnlineEntity {
  id: bigint
  tokenId: string
  ip: string
  location: string
  browser: string
  os: string
  loginTime: Date
  user: ISysUserEntity
}

export const sysOnlineEntity = new EntitySchema<ISysOnlineEntity>({
  name: 'SysOnlineEntity',
  tableName: 'sys_online',
  properties: {
    id: { type: 'bigint', primary: true, autoincrement: true },
    tokenId: { type: 'string' },
    ip: { type: 'string' },
    location: { type: 'string' },
    browser: { type: 'string' },
    os: { type: 'string' },
    loginTime: { type: 'Date' },
    user: { kind: '1:1', entity: () => sysUserEntity, joinColumn: 'user_id' },
  },
})
