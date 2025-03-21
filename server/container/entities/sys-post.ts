import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'
import { SysUserEntity } from './sys-user.js'

@Entity({ tableName: 'sys_post' })
export class SysPostEntity extends BaseEntity {
  @Property({ unique: true })
  postKey: string

  @Property()
  postName: string

  @Enum(() => yesOrNoEnum.values)
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysUserEntity, user => user.posts)
  users = new Collection<SysUserEntity>(this)
}

export type ISysPostEntity = InstanceType<typeof SysPostEntity>
