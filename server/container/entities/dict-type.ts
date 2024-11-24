import { EntitySchema } from '@mikro-orm/core'

import { EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface DictTypeEntityType extends BaseEntityType {
  dictName: string
  dictType: string
  isAvailable: EntityYesOrNo
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
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
  },
})
