import { EntitySchema } from '@mikro-orm/core'

import { EntityStatus } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface DictTypeEntityType extends BaseEntityType {
  dictName: string
  dictType: string
  status: EntityStatus
  remark: string
}

export const DictTypeEntityName = 'DictTypeEntity'

export const DictTypeEntity = new EntitySchema<DictTypeEntityType, BaseEntityType>({
  name: DictTypeEntityName,
  tableName: 'sys_dict_type',
  extends: BaseEntity,
  properties: {
    dictName: { type: 'string' },
    dictType: { type: 'string', unique: true },
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    remark: { type: 'string', nullable: true },
  },
})
