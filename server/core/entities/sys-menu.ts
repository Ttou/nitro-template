import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_menu' })
export class SysMenuEntity extends BaseEntity {
  @Property({ type: 'bigint', nullable: true })
  parentId?: bigint

  @Property()
  menuName: string

  @Property({ unique: true })
  menuKey: string

  @Enum(() => MenuTypeDict.values())
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

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Enum({ items: () => YesOrNoDict.values(), nullable: true })
  isCache?: IYesOrNoEnum

  @Enum({ items: () => YesOrNoDict.values(), nullable: true })
  isFrame?: IYesOrNoEnum

  @Enum({ items: () => YesOrNoDict.values(), nullable: true })
  isVisible?: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @ManyToMany(() => SysRoleEntity, role => role.menus)
  roles = new Collection<SysRoleEntity>(this)
}
