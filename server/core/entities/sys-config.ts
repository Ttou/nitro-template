import { EntitySchema } from '@mikro-orm/core'

export interface ISysConfigEntity extends IBaseEntity {
  configName: string
  configKey: string
  configValue: string
  isBuiltin: string
  isAvailable: string
  remark: string
}

export const sysConfigEntity = new EntitySchema<ISysConfigEntity, IBaseEntity>({
  name: 'SysConfigEntity',
  tableName: 'sys_config',
  extends: baseEntity,
  properties: {
    configName: { type: 'string' },
    configKey: { type: 'string', unique: true },
    configValue: { type: 'string' },
    isBuiltin: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
  },
})
