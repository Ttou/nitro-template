import { Collection, EntitySchema } from '@mikro-orm/core'

import { YesOrNo } from '../../../shared/options/yes-or-no.js'
import { BaseEntity } from './base.js'
import { SysDeptEntity } from './sys-dept.js'
import { SysMenuEntity } from './sys-menu.js'
import { SysUserEntity } from './sys-user.js'

export interface SysRoleEntityType extends BaseEntityType {
  roleName: string
  roleKey: string
  isAvailable: string
  remark: string
  depts: Collection<SysDeptEntityType>
  menus: Collection<SysMenuEntityType>
  users: Collection<SysUserEntityType>
}

export const SysRoleEntityName = 'SysRoleEntity'

export const SysRoleEntity = new EntitySchema<SysRoleEntityType, BaseEntityType>({
  name: SysRoleEntityName,
  tableName: 'sys_role',
  extends: BaseEntity,
  properties: {
    roleName: { type: 'string' },
    roleKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    depts: { kind: 'm:n', entity: () => SysDeptEntity, ref: true, pivotTable: 'rel_role_dept', joinColumn: 'role_id', inverseJoinColumn: 'dept_id' },
    menus: { kind: 'm:n', entity: () => SysMenuEntity, ref: true, pivotTable: 'rel_role_menu', joinColumn: 'role_id', inverseJoinColumn: 'menu_id' },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.roles },
  },
})
