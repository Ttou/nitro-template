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

  @Enum(() => YesOrNoDict.values())
  isBuiltin: IYesOrNoEnum

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string
}
