import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

import { BaseEntity } from './base.js'

export interface ISysRoleEntity extends IBaseEntity {
  roleName: string
  roleKey: string
  isAvailable: string
  remark: string
  depts: Collection<ISysDeptEntity>
  menus: Collection<ISysMenuEntity>
  users: Collection<ISysUserEntity>
}

export type ISysRoleEntityRelationKeys = ConditionalKeys<ISysRoleEntity, Collection<any>>

export const SysRoleEntity = new EntitySchema<ISysRoleEntity, IBaseEntity>({
  name: EntityNameEnum.SysRole,
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
