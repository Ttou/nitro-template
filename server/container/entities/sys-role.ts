import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'
import { SysDeptEntity } from './sys-dept.js'
import { SysMenuEntity } from './sys-menu.js'
import { SysUserEntity } from './sys-user.js'

@Entity({ tableName: 'sys_role' })
export class SysRoleEntity extends BaseEntity {
  @Property({ unique: true })
  roleKey: string

  @Property()
  roleName: string

  @Enum(() => YesOrNoEnum)
  isAvailable: YesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysDeptEntity, 'roles', { owner: true, ref: true, pivotTable: 'rel_role_dept', joinColumn: 'role_id', inverseJoinColumn: 'dept_id' })
  depts = new Collection<SysDeptEntity>(this)

  @ManyToMany(() => SysMenuEntity, 'roles', { owner: true, ref: true, pivotTable: 'rel_role_menu', joinColumn: 'role_id', inverseJoinColumn: 'menu_id' })
  menus = new Collection<SysMenuEntity>(this)

  @ManyToMany(() => SysUserEntity, user => user.roles)
  users = new Collection<SysUserEntity>(this)
}

export type ISysRoleEntity = InstanceType<typeof SysRoleEntity>
