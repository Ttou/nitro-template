import { Entity, Enum, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'

@Entity({ tableName: 'sys_dict_data' })
export class SysDictDataEntity extends BaseEntity {
  @Property()
  dictLabel: string

  @Property({ unique: true })
  dictValue: string

  @Property()
  dictType: string

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string
}
