import { EntitySchema } from '@mikro-orm/core'

// 为了 mikro-orm 识别，需要显示导入
import { EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'

export interface ConfigEntityType extends BaseEntityType {
  configName: string
  configKey: string
  configValue: string
  isBuiltIn: EntityYesOrNo
  remark: string
}

export const ConfigEntityName = 'ConfigEntity'

export const ConfigEntity = new EntitySchema<ConfigEntityType, BaseEntityType>({
  name: ConfigEntityName,
  tableName: 'sys_config',
  extends: BaseEntity,
  properties: {
    configName: { type: 'string' },
    configKey: { type: 'string', unique: true },
    isBuiltIn: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    configValue: { type: 'string' },
    remark: { type: 'string', nullable: true },
  },
})
