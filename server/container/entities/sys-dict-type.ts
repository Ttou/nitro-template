import { EntitySchema } from '@mikro-orm/core'

import { BaseEntity } from './base.js'

export interface ISysDictTypeEntity extends IBaseEntity {
  dictName: string
  dictType: string
  isAvailable: string
  remark: string
}

export const SysDictTypeEntity = new EntitySchema<ISysDictTypeEntity, IBaseEntity>({
  name: EntityNameEnum.SysDictType,
  tableName: 'sys_dict_type',
  extends: BaseEntity,
  properties: {
    dictName: { type: 'string' },
    dictType: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
  },
})
