import { Collection, EntitySchema } from '@mikro-orm/core'

import { YesOrNo } from '../../../shared/constants/options.js'
import { BaseEntity } from './base.js'
import { SysUserEntity } from './sys-user.js'

export interface SysPostEntityType extends BaseEntityType {
  postName: string
  postCode: string
  isAvailable: string
  isDelete: string
  remark: string
  users: Collection<SysUserEntityType>
}

export const SysPostEntityName = 'SysPostEntity'

export const SysPostEntity = new EntitySchema<SysPostEntityType, BaseEntityType>({
  name: SysPostEntityName,
  tableName: 'sys_post',
  extends: BaseEntity,
  properties: {
    postName: { type: 'string' },
    postCode: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    isDelete: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.posts },
  },
})
