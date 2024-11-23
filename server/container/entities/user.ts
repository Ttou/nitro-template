import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityDelFlag, EntitySex, EntityStatus } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { PostEntity } from './post.js'
import { RoleEntity } from './role.js'

export interface UserEntityType extends BaseEntityType {
  userName: string
  nickName: string
  password: string
  email: string
  phone: string
  sex: EntitySex
  avatar: string
  status: EntityStatus
  delFlag: EntityDelFlag
  remark: string
  posts: Collection<PostEntityType>
  roles: Collection<RoleEntityType>
}

export const UserEntityName = 'UserEntity'

export const UserEntity = new EntitySchema<UserEntityType, BaseEntityType>({
  name: UserEntityName,
  tableName: 'sys_user',
  extends: BaseEntity,
  properties: {
    userName: { type: 'string', unique: true },
    nickName: { type: 'string', nullable: true },
    password: { type: 'string' },
    email: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    sex: { type: 'enum', enum: true, items: () => EntitySex, nullable: true },
    avatar: { type: 'string', nullable: true },
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    delFlag: { type: 'enum', enum: true, items: () => EntityDelFlag },
    remark: { type: 'string', nullable: true },
    posts: { kind: 'm:n', entity: () => PostEntity, ref: true, pivotTable: 'sys_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' },
    roles: { kind: 'm:n', entity: () => RoleEntity, ref: true, pivotTable: 'sys_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' },
  },
})
