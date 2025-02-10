import { EntitySchema } from '@mikro-orm/core'

export interface ISysDictDataEntity extends IBaseEntity {
  dictLabel: string
  dictValue: string
  dictType: string
  isAvailable: string
  remark: string
}

export const SysDictDataEntityName = 'SysDictDataEntity'

export const SysDictDataEntity = new EntitySchema<ISysDictDataEntity, IBaseEntity>({
  name: SysDictDataEntityName,
  tableName: 'sys_dict_data',
  extends: BaseEntity,
  properties: {
    dictLabel: { type: 'string' },
    dictValue: { type: 'string', unique: true },
    dictType: { type: 'string' },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
  },
})
