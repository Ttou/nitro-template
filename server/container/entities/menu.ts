import { Collection, EntitySchema } from '@mikro-orm/core'

// 为了 mikro-orm 识别，需要显示导入
import { YesOrNo } from '../../constants/enum/common.enum.js';
import { EntityMenuType, EntityStatus } from '../../constants/enum/entity.enum.js'
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
  status: EntityStatus
  isFrame: YesOrNo
  isCache: YesOrNo
  isVisible: YesOrNo
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
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    isCache: { type: 'enum', enum: true, items: () => YesOrNo, nullable: true },
    isFrame: { type: 'enum', enum: true, items: () => YesOrNo, nullable: true },
    isVisible: { type: 'enum', enum: true, items: () => YesOrNo, nullable: true },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => RoleEntity, mappedBy: role => role.menus },
  },
})
