import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'
import { SysRoleEntity } from './sys-role.js'

@Entity({ tableName: 'sys_menu' })
export class SysMenuEntity extends BaseEntity {
  @Property({ type: 'bigint', nullable: true })
  parentId?: bigint

  @Property()
  menuName: string

  @Property({ unique: true })
  menuKey: string

  @Enum(() => MenuTypeEnum)
  menuType: MenuTypeEnum

  @Property()
  orderNum: number

  @Property({ nullable: true })
  path?: string

  @Property({ nullable: true })
  component?: string

  @Property({ nullable: true })
  redirect?: string

  @Property({ nullable: true })
  icon?: string

  @Enum(() => YesOrNoEnum)
  isAvailable: YesOrNoEnum

  @Enum({ items: () => YesOrNoEnum, nullable: true })
  isCache?: YesOrNoEnum

  @Enum({ items: () => YesOrNoEnum, nullable: true })
  isFrame?: YesOrNoEnum

  @Enum({ items: () => YesOrNoEnum, nullable: true })
  isVisible?: YesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysRoleEntity, role => role.menus)
  roles = new Collection<SysRoleEntity>(this)
}
