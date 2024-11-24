import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityYesOrNo } from '../enums/entity.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { SysRoleEntity } from './sys-role.js'
import { SysUserEntity } from './sys-user.js'

export interface SysDeptEntityType extends BaseEntityType {
  parentId: number
  deptName: string
  isAvailable: EntityYesOrNo
  isDelete: EntityYesOrNo
  remark: string
  roles: Collection<SysRoleEntityType>
  users: Collection<SysUserEntityType>
}

export const SysDeptEntityName = 'SysDeptEntity'

export const SysDeptEntity = new EntitySchema<SysDeptEntityType, BaseEntityType>({
  name: SysDeptEntityName,
  tableName: 'sys_dept',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'numeric' },
    deptName: { type: 'string' },
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    isDelete: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => SysRoleEntity, mappedBy: role => role.depts },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.depts },
  },
})
