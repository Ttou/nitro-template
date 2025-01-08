import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface SysDeptEntityType extends BaseEntityType {
  parentId: bigint
  deptName: string
  deptKey: string
  isAvailable: string
  remark: string
  roles: Collection<SysRoleEntityType>
  users: Collection<SysUserEntityType>
}

export type SysDeptEntityTypeRelationKeys = ConditionalKeys<SysDeptEntityType, Collection<any>>

export const SysDeptEntityName = 'SysDeptEntity'

export const SysDeptEntity = new EntitySchema<SysDeptEntityType, BaseEntityType>({
  name: SysDeptEntityName,
  tableName: 'sys_dept',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'bigint', nullable: true },
    deptName: { type: 'string' },
    deptKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => SysRoleEntity, mappedBy: role => role.depts },
    users: { kind: 'm:n', entity: () => SysUserEntity, mappedBy: user => user.depts },
  },
})
