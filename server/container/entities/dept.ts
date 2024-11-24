import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { RoleEntity } from './role.js'
import { UserEntity } from './user.js'

export interface DeptEntityType extends BaseEntityType {
  parentId: number
  deptName: string
  isAvailable: EntityYesOrNo
  isDelete: EntityYesOrNo
  remark: string
  roles: Collection<RoleEntityType>
  users: Collection<UserEntityType>
}

export const DeptEntityName = 'DeptEntity'

export const DeptEntity = new EntitySchema<DeptEntityType, BaseEntityType>({
  name: DeptEntityName,
  tableName: 'sys_dept',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'numeric' },
    deptName: { type: 'string' },
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    isDelete: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => RoleEntity, mappedBy: role => role.depts },
    users: { kind:'m:n', entity: () => UserEntity, mappedBy: user => user.depts },
  },
})
