import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntitySex, EntityYesOrNo } from '../../constants/enum/entity.enum.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { DeptEntity } from './dept.js'
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
  isAvailable: EntityYesOrNo
  isDelete: EntityYesOrNo
  remark: string
  depts: Collection<DeptEntityType>
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
    isAvailable: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    isDelete: { type: 'enum', enum: true, items: () => EntityYesOrNo },
    remark: { type: 'string', nullable: true },
    depts: { kind:'m:n', entity: () => DeptEntity, ref: true, pivotTable:'rel_user_dept', joinColumn: 'user_id', inverseJoinColumn: 'dept_id' },
    posts: { kind: 'm:n', entity: () => PostEntity, ref: true, pivotTable: 'rel_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' },
    roles: { kind: 'm:n', entity: () => RoleEntity, ref: true, pivotTable: 'rel_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' },
  },
})
