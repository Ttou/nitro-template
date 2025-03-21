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

  @Enum(() => menuTypeEnum.values)
  menuType: IMenuTypeEnum

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

  @Enum(() => yesOrNoEnum.values)
  isAvailable: IYesOrNoEnum

  @Enum({ items: () => yesOrNoEnum.values, nullable: true })
  isCache?: IYesOrNoEnum

  @Enum({ items: () => yesOrNoEnum.values, nullable: true })
  isFrame?: IYesOrNoEnum

  @Enum({ items: () => yesOrNoEnum.values, nullable: true })
  isVisible?: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysRoleEntity, role => role.menus)
  roles = new Collection<SysRoleEntity>(this)
}

export type ISysMenuEntity = InstanceType<typeof SysMenuEntity>
