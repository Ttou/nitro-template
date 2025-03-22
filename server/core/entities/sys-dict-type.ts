import { EntitySchema } from '@mikro-orm/core'

export interface ISysDictTypeEntity extends IBaseEntity {
  dictName: string
  dictType: string
  isAvailable: string
  remark?: string
}

export const sysDictTypeEntity = new EntitySchema<ISysDictTypeEntity, IBaseEntity>({
  name: 'SysDictTypeEntity',
  tableName: 'sys_dict_type',
  extends: baseEntity,
  properties: {
    dictName: { type: 'string' },
    dictType: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
  },
})
