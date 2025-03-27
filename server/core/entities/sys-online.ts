import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { SysUserEntity } from './sys-user'

@Entity({ tableName: 'sys_online' })
export class SysOnlineEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property()
  tokenId: string

  @Property()
  ip: string

  @Property()
  location: string

  @Property()
  browser: string

  @Property()
  os: string

  @Property()
  loginTime: Date

  @OneToOne(() => SysUserEntity, { joinColumn: 'user_id' })
  user: SysUserEntity
}
