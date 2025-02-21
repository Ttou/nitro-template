import { Entity, Enum, Property } from '@mikro-orm/core'

import { BaseEntity } from './base.js'

@Entity({ tableName: 'sys_dict_type' })
export class SysDictTypeEntity extends BaseEntity {
  @Property()
  dictName: string

  @Property({ unique: true })
  dictType: string

  @Enum(() => YesOrNoEnum)
  isAvailable: YesOrNoEnum

  @Property({ nullable: true })
  remark?: string
}
