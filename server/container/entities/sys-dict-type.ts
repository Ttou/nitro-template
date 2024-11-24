import { EntitySchema } from '@mikro-orm/core'

import { EntityYesOrNo } from '../enums/entity.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface SysDictTypeEntityType extends BaseEntityType {
  dictName: string
  dictType: string
  isAvailable: EntityYesOrNo
  remark: string
}

export const SysDictTypeEntityName = 'SysDictTypeEntity'

export const SysDictTypeEntity = new EntitySchema<SysDictTypeEntityType, BaseEntityType>({
  name: SysDictTypeEntityName,
  tableName: 'sys_dict_type',
  extends: BaseEntity,
  properties: {
    dictName: { type: 'string' },
    dictType: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
  },
})
