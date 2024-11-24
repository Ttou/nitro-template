import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityDelFlag, EntityStatus } from '../../constants/enum/entity.enum.js'
import { BaseEntity } from './base.js'
import { DeptEntity } from './dept.js'
import { MenuEntity } from './menu.js';
import { UserEntity } from './user.js'

export interface RoleEntityType extends BaseEntityType {
  roleName: string
  roleKey: string
  status: EntityStatus
  delFlag: EntityDelFlag
  remark: string
  depts: Collection<DeptEntityType>
  menus: Collection<MenuEntityType>
  users: Collection<UserEntityType>
}

export const RoleEntityName = 'RoleEntity'

export const RoleEntity = new EntitySchema<RoleEntityType, BaseEntityType>({
  name: RoleEntityName,
  tableName: 'sys_role',
  extends: BaseEntity,
  properties: {
    roleName: { type: 'string' },
    roleKey: { type: 'string', unique: true },
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    delFlag: { type: 'enum', enum: true, items: () => EntityDelFlag },
    remark: { type: 'string', nullable: true },
    depts: { kind: 'm:n', entity: () => DeptEntity, ref: true, pivotTable: 'rel_role_dept', joinColumn: 'role_id', inverseJoinColumn: 'dept_id' },
    menus: { kind:'m:n', entity: () => MenuEntity, ref: true, pivotTable:'rel_role_menu', joinColumn: 'role_id', inverseJoinColumn:'menu_id' },
    users: { kind: 'm:n', entity: () => UserEntity, mappedBy: user => user.roles },
  },
})
