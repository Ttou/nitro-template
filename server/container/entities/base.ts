import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property()
  createBy: string

  @Property()
  createdAt = new Date()

  @Property()
  updateBy: string

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
