import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface ISysDeptEntity extends IBaseEntity {
  parentId?: bigint
  deptName: string
  deptKey: string
  isAvailable: string
  remark?: string
  roles: Collection<ISysRoleEntity>
  users: Collection<ISysUserEntity>
}

export type ISysDeptEntityRelationKeys = ConditionalKeys<ISysDeptEntity, Collection<any>>
  | `roles.${ConditionalKeys<ISysRoleEntity, Collection<any>>}`
  | `users.${ConditionalKeys<ISysUserEntity, Collection<any>>}`

export const sysDeptEntity = new EntitySchema<ISysDeptEntity, IBaseEntity>({
  name: 'SysDeptEntity',
  tableName: 'sys_dept',
  extends: baseEntity,
  properties: {
    parentId: { type: 'bigint', nullable: true },
    deptName: { type: 'string' },
    deptKey: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => sysRoleEntity, mappedBy: role => role.depts },
    users: { kind: 'm:n', entity: () => sysUserEntity, mappedBy: user => user.depts },
  },
})
