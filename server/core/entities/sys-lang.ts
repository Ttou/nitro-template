import { Entity, Enum, Property } from '@mikro-orm/core'

interface ILangValue {
  'en': string
  'zh-CN': string
}

@Entity({ tableName: 'sys_lang' })
export class SysLangEntity extends BaseEntity {
  @Property({ unique: true })
  langKey: string

  @Property({ type: 'json' })
  langValue: ILangValue

  @Enum(() => YesOrNoDict.values())
  isBuiltin: IYesOrNoEnum

  @Enum(() => YesOrNoDict.values())
  isAvailable: IYesOrNoEnum

  @Property()
  remark?: string
}
