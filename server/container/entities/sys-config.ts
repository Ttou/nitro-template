import { Entity, Enum, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'

@Entity({ tableName: 'sys_config' })
export class SysConfigEntity extends BaseEntity {
  @Property()
  configName: string

  @Property({ unique: true })
  configKey: string

  @Property()
  configValue: string

  @Enum(() => YesOrNoEnum)
  isBuiltin: YesOrNoEnum

  @Enum(() => YesOrNoEnum)
  isAvailable: YesOrNoEnum

  @Property({ nullable: true })
  remark?: string
}
