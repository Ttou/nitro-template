import { EntitySchema } from '@mikro-orm/core'

import { EntityStatus } from '../../constants/enum/entity.enum.js'
// 为了 mikro-orm 识别，需要显示导入 BaseEntity
import { BaseEntity, BaseEntityType } from './base.js'

export interface DictDataEntityType extends BaseEntityType {
  dictLabel: string
  dictValue: string
  dictType: string
  status: EntityStatus
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
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    remark: { type: 'string', nullable: true },
  },
})
