import { EntitySchema } from '@mikro-orm/core'

import { YesOrNo } from '../../../shared/options/yes-or-no.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface SysDictTypeEntityType extends BaseEntityType {
  dictName: string
  dictType: string
  isAvailable: string
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
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
  },
})
