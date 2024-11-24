import { EntitySchema } from '@mikro-orm/core'

import { EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface DictDataEntityType extends BaseEntityType {
  dictLabel: string
  dictValue: string
  dictType: string
  isAvailable: EntityYesOrNo
  remark: string
}

export const DictDataEntityName = 'DictDataEntity'

export const DictDataEntity = new EntitySchema<DictDataEntityType, BaseEntityType>({
  name: DictDataEntityName,
  tableName: 'sys_dict_data',
  extends: BaseEntity,
  properties: {
    dictLabel: { type: 'string' },
    dictValue: { type: 'string', unique: true },
    dictType: { type: 'string' },
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
  },
})
