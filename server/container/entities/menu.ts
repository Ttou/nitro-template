import { Collection, EntitySchema } from '@mikro-orm/core'

// 为了 mikro-orm 识别，需要显示导入
import { EntityMenuType, EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity } from './base.js'
import { RoleEntity } from './role.js';

export interface MenuEntityType extends BaseEntityType {
  parentId: number
  menuName: string
  menuKey: string
  menuType: EntityMenuType
  orderNum: number
  path: string
  component: string
  redirect: string
  icon: string
  isAvailable: EntityYesOrNo
  isFrame: EntityYesOrNo
  isCache: EntityYesOrNo
  isVisible: EntityYesOrNo
  remark: string
  roles: Collection<RoleEntityType>
}

export const MenuEntityName = 'MenuEntity'

export const MenuEntity = new EntitySchema<MenuEntityType, BaseEntityType>({
  name: MenuEntityName,
  tableName: 'sys_menu',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'numeric' },
    menuName: { type:'string' },
    menuKey: { type: 'string', unique: true },
    menuType: { type: 'enum', enum: true, items: () => EntityMenuType },
    orderNum: { type: 'numeric' },
    path: { type:'string', nullable: true },
    component: { type: 'string', nullable: true },
    redirect: { type:'string', nullable: true },
    icon: { type:'string', nullable: true },
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    isCache: { type: 'enum', enum: true, items: () => EntityYesOrNo, nullable: true },
    isFrame: { type: 'enum', enum: true, items: () => EntityYesOrNo, nullable: true },
    isVisible: { type: 'enum', enum: true, items: () => EntityYesOrNo, nullable: true },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => RoleEntity, mappedBy: role => role.menus },
  },
})
