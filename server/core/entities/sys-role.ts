import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface ISysRoleEntity extends IBaseEntity {
  roleName: string
  roleKey: string
  isAvailable: string
  remark?: string
  depts: Collection<ISysDeptEntity>
  menus: Collection<ISysMenuEntity>
  users: Collection<ISysUserEntity>
}

export type ISysRoleEntityRelationKeys = ConditionalKeys<ISysRoleEntity, Collection<any>>
  | `depts.${ConditionalKeys<ISysDeptEntity, Collection<any>>}`
  | `menus.${ConditionalKeys<ISysMenuEntity, Collection<any>>}`
  | `users.${ConditionalKeys<ISysUserEntity, Collection<any>>}`

export const sysRoleEntity = new EntitySchema<ISysRoleEntity, IBaseEntity>({
  name: 'SysRoleEntity',
  tableName: 'sys_role',
  extends: baseEntity,
  properties: {
    roleName: { type: 'string' },
    roleKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
    depts: { kind: 'm:n', entity: () => sysDeptEntity, ref: true, pivotTable: 'rel_role_dept', joinColumn: 'role_id', inverseJoinColumn: 'dept_id' },
    menus: { kind: 'm:n', entity: () => sysMenuEntity, ref: true, pivotTable: 'rel_role_menu', joinColumn: 'role_id', inverseJoinColumn: 'menu_id' },
    users: { kind: 'm:n', entity: () => sysUserEntity, mappedBy: user => user.roles },
  },
})
