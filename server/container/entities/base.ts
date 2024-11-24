import { EntitySchema } from '@mikro-orm/core'

export interface BaseEntityType {
  id: number
  createBy: string
  createdAt: Date
  updateBy: string
  updatedAt: Date
}

export const BaseEntity = new EntitySchema<BaseEntityType>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: { type: 'numeric', primary: true, autoincrement: true },
    createBy: { type: 'string', nullable: true },
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
    updateBy: { type: 'string', nullable: true },
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
  },
})
