import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

import { BaseEntity } from './base.js'

export interface ISysPostEntity extends IBaseEntity {
  postName: string
  postKey: string
  isAvailable: string
  remark: string
  users: Collection<ISysUserEntity>
}

export type ISysPostEntityRelationKeys = ConditionalKeys<ISysPostEntity, Collection<any>>

export const SysPostEntity = new EntitySchema<ISysPostEntity, IBaseEntity>({
  name: EntityNameEnum.SysPost,
  tableName: 'sys_post',
  extends: BaseEntity,
  properties: {
    postName: { type: 'string' },
    postKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.posts },
  },
})
