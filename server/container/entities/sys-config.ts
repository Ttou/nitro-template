import { EntitySchema } from '@mikro-orm/core'

import { BaseEntity } from './base.js'

export interface ISysConfigEntity extends IBaseEntity {
  configName: string
  configKey: string
  configValue: string
  isBuiltin: string
  isAvailable: string
  remark: string
}

export const SysConfigEntity = new EntitySchema<ISysConfigEntity, IBaseEntity>({
  name: EntityNameEnum.SysConfig,
  tableName: 'sys_config',
  extends: BaseEntity,
  properties: {
    configName: { type: 'string' },
    configKey: { type: 'string', unique: true },
    configValue: { type: 'string' },
    isBuiltin: { type: 'enum', enum: true, items: () => YesOrNo.values },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
  },
})
