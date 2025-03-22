import { EntitySchema } from '@mikro-orm/core'

export interface IBaseEntity {
  id: bigint
  createBy: string
  createdAt: Date
  updateBy: string
  updatedAt: Date
}

export const baseEntity = new EntitySchema<IBaseEntity>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: { type: 'bigint', primary: true, autoincrement: true },
    createBy: { type: 'string', nullable: true },
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
    updateBy: { type: 'string', nullable: true },
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
  },
})
