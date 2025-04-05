import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_dept' })
export class SysDeptEntity extends BaseEntity {
  @Property({ type: 'bigint', nullable: true })
  parentId?: bigint

  @Property({ unique: true })
  deptKey: string

  @Property()
  deptName: string

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysRoleEntity, role => role.depts)
  roles = new Collection<SysRoleEntity>(this)

  @ManyToMany(() => SysUserEntity, user => user.depts)
  users = new Collection<SysUserEntity>(this)
}
