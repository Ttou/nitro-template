import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface ISysPostEntity extends IBaseEntity {
  postName: string
  postKey: string
  isAvailable: string
  remark: string
  users: Collection<ISysUserEntity>
}

export type ISysPostEntityRelationKeys = ConditionalKeys<ISysPostEntity, Collection<any>>
  | `users.${ConditionalKeys<ISysUserEntity, Collection<any>>}`

export const sysPostEntity = new EntitySchema<ISysPostEntity, IBaseEntity>({
  name: 'SysPostEntity',
  tableName: 'sys_post',
  extends: baseEntity,
  properties: {
    postName: { type: 'string' },
    postKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
    users: { kind: 'm:n', entity: () => sysUserEntity, mappedBy: user => user.posts },
  },
})
