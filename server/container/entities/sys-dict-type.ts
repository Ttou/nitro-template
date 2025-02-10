import { EntitySchema } from '@mikro-orm/core'

export interface ISysDictTypeEntity extends IBaseEntity {
  dictName: string
  dictType: string
  isAvailable: string
  remark: string
}

export const SysDictTypeEntityName = 'SysDictTypeEntity'

export const SysDictTypeEntity = new EntitySchema<ISysDictTypeEntity, IBaseEntity>({
  name: SysDictTypeEntityName,
  tableName: 'sys_dict_type',
  extends: BaseEntity,
  properties: {
    dictName: { type: 'string' },
    dictType: { type: 'string', unique: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
  },
})
