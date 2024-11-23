import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityDelFlag, EntityStatus } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { RoleEntity } from './role.js'

export interface DeptEntityType extends BaseEntityType {
  parentId: number
  deptName: string
  status: EntityStatus
  delFlag: EntityDelFlag
  remark: string
  roles: Collection<RoleEntityType>
}

export const DeptEntityName = 'DeptEntity'

export const DeptEntity = new EntitySchema<DeptEntityType, BaseEntityType>({
  name: DeptEntityName,
  tableName: 'sys_dept',
  extends: BaseEntity,
  properties: {
    parentId: { type: 'numeric' },
    deptName: { type: 'string' },
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    delFlag: { type: 'enum', enum: true, items: () => EntityDelFlag },
    remark: { type: 'string', nullable: true },
    roles: { kind: 'm:n', entity: () => RoleEntity, mappedBy: role => role.depts },
  },
})
