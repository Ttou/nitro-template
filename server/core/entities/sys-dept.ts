import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'
import { SysRoleEntity } from './sys-role.js'
import { SysUserEntity } from './sys-user.js'

@Entity({ tableName: 'sys_dept' })
export class SysDeptEntity extends BaseEntity {
  @Property({ type: 'bigint', nullable: true })
  parentId?: bigint

  @Property({ unique: true })
  deptKey: string

  @Property()
  deptName: string

  @Enum(() => yesOrNoEnum.values)
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysRoleEntity, role => role.depts)
  roles = new Collection<SysRoleEntity>(this)

  @ManyToMany(() => SysUserEntity, user => user.depts)
  users = new Collection<SysUserEntity>(this)
}
