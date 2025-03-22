import { EntitySchema } from '@mikro-orm/core'

export interface ISysDictDataEntity extends IBaseEntity {
  dictLabel: string
  dictValue: string
  dictType: string
  isAvailable: string
  remark?: string
}

export const sysDictDataEntity = new EntitySchema<ISysDictDataEntity, IBaseEntity>({
  name: 'SysDictDataEntity',
  tableName: 'sys_dict_data',
  extends: baseEntity,
  properties: {
    dictLabel: { type: 'string' },
    dictValue: { type: 'string', unique: true },
    dictType: { type: 'string' },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
  },
})
