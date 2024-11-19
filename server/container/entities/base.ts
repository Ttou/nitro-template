import { EntitySchema } from '@mikro-orm/core'

export interface BaseEntityType {
  id: number
  createdAt: Date
  updatedAt: Date
}

export const BaseEntity = new EntitySchema<BaseEntityType>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: { type: 'number', primary: true },
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
  },
})
