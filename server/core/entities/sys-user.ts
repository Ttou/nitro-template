import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_user' })
export class SysUserEntity extends BaseEntity {
  @Property({ unique: true })
  userName: string

  @Property()
  nickName: string

  @Property()
  password: string

  @Property({ nullable: true })
  email?: string

  @Property({ nullable: true })
  phone?: string

  @Enum(() => SexDict.values())
  sex: ISexEnum

  @Property({ nullable: true })
  avatar?: string

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Enum(() => YesOrNoDict.values())
  isDelete: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysDeptEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_dept', joinColumn: 'user_id', inverseJoinColumn: 'dept_id' })
  depts = new Collection<SysDeptEntity>(this)

  @ManyToMany(() => SysPostEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' })
  posts = new Collection<SysPostEntity>(this)

  @ManyToMany(() => SysRoleEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' })
  roles = new Collection<SysRoleEntity>(this)
}
