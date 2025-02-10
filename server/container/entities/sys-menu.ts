import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface ISysMenuEntity extends IBaseEntity {
  parentId: bigint
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
  roles: Collection<ISysRoleEntity>
}

export type ISysMenuEntityRelationKeys = ConditionalKeys<ISysMenuEntity, Collection<any>>

export const SysMenuEntityName = 'SysMenuEntity'

export const SysMenuEntity = new EntitySchema<ISysMenuEntity, IBaseEntity>({
  name: SysMenuEntityName,
  tableName: 'sys_menu',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'bigint', nullable: true },
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
