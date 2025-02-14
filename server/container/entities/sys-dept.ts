import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

import { BaseEntity } from './base.js'

export interface ISysDeptEntity extends IBaseEntity {
  parentId: bigint
  deptName: string
  deptKey: string
  isAvailable: string
  remark: string
  roles: Collection<ISysRoleEntity>
  users: Collection<ISysUserEntity>
}

export type ISysDeptEntityRelationKeys = ConditionalKeys<ISysDeptEntity, Collection<any>>

export const SysDeptEntity = new EntitySchema<ISysDeptEntity, IBaseEntity>({
  name: EntityNameEnum.SysDept,
  tableName: 'sys_dept',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'bigint', nullable: true },
    deptName: { type: 'string' },
    deptKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => SysRoleEntity, mappedBy: role => role.depts },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.depts },
  },
})
