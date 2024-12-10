import { EntitySchema } from '@mikro-orm/core'

export interface SysConfigEntityType extends BaseEntityType {
  configName: string
  configKey: string
  configValue: string
  isBuiltin: string
  isAvailable: string
  remark: string
}

export const SysConfigEntityName = 'SysConfigEntity'

export const SysConfigEntity = new EntitySchema<SysConfigEntityType, BaseEntityType>({
  name: SysConfigEntityName,
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
