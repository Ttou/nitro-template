import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_role' })
export class SysRoleEntity extends BaseEntity {
  @Property({ unique: true })
  roleKey: string

  @Property()
  roleName: string

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysDeptEntity, 'roles', { owner: true, ref: true, pivotTable: 'rel_role_dept', joinColumn: 'role_id', inverseJoinColumn: 'dept_id' })
  depts = new Collection<SysDeptEntity>(this)

  @ManyToMany(() => SysMenuEntity, 'roles', { owner: true, ref: true, pivotTable: 'rel_role_menu', joinColumn: 'role_id', inverseJoinColumn: 'menu_id' })
  menus = new Collection<SysMenuEntity>(this)

  @ManyToMany(() => SysUserEntity, user => user.roles)
  users = new Collection<SysUserEntity>(this)
}
