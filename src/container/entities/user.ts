import { EntitySchema } from '@mikro-orm/core'

// 为了 mikro-orm 识别，需要显示导入 BaseEntity
import { BaseEntity, BaseEntityType } from './base.js'

export interface UserEntityType extends BaseEntityType {
  username: string
  password: string
  nickname: string
}

export const UserEntityName = 'UserEntity'

export const UserEntity = new EntitySchema<UserEntityType, BaseEntityType>({
  name: UserEntityName,
  tableName: 'users',
  extends: BaseEntity,
  properties: {
    username: { type: 'string', unique: true },
    password: { type: 'string' },
    nickname: { type: 'string', nullable: true },
  },
})
