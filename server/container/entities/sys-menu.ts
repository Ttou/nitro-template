import { Collection, EntitySchema } from '@mikro-orm/core'

// 为了 mikro-orm 识别，需要显示导入
import { MenuType } from '../../../shared/options/menu-type.js'
import { YesOrNo } from '../../../shared/options/yes-or-no.js'
import { BaseEntity } from './base.js'
import { SysRoleEntity } from './sys-role.js'

export interface SysMenuEntityType extends BaseEntityType {
  parentId: number
  menuName: string
  menuKey: string
  menuType: string
  orderNum: number
  path: string
  component: string
  redirect: string
  icon: string
  isAvailable: string
  isFrame: string
  isCache: string
  isVisible: string
  remark: string
  roles: Collection<SysRoleEntityType>
}

export const SysMenuEntityName = 'SysMenuEntity'

export const SysMenuEntity = new EntitySchema<SysMenuEntityType, BaseEntityType>({
  name: SysMenuEntityName,
  tableName: 'sys_menu',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'numeric' },
    menuName: { type: 'string' },
    menuKey: { type: 'string', unique: true },
    menuType: { type: 'enum', enum: true, items: () => MenuType.values },
    orderNum: { type: 'numeric' },
    path: { type: 'string', nullable: true },
    component: { type: 'string', nullable: true },
    redirect: { type: 'string', nullable: true },
    icon: { type: 'string', nullable: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    isCache: { type: 'enum', enum: true, items: () => YesOrNo.values, nullable: true },
    isFrame: { type: 'enum', enum: true, items: () => YesOrNo.values, nullable: true },
    isVisible: { type: 'enum', enum: true, items: () => YesOrNo.values, nullable: true },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => SysRoleEntity, mappedBy: role => role.menus },
  },
})
