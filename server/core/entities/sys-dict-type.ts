import { Entity, Enum, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_dict_type' })
export class SysDictTypeEntity extends BaseEntity {
  @Property()
  dictName: string

  @Property({ unique: true })
  dictType: string

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string
}
