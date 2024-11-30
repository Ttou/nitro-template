import { Collection, EntitySchema } from '@mikro-orm/core'

import { YesOrNo } from '../../../shared/constants/options.js'
import { BaseEntity, BaseEntityType } from './base.js'
import { SysDeptEntity } from './sys-dept.js'
import { SysPostEntity } from './sys-post.js'
import { SysRoleEntity } from './sys-role.js'

export interface SysUserEntityType extends BaseEntityType {
  userName: string
  nickName: string
  password: string
  email: string
  phone: string
  sex: string
  avatar: string
  isAvailable: string
  isDelete: string
  remark: string
  depts: Collection<SysDeptEntityType>
  posts: Collection<SysPostEntityType>
  roles: Collection<SysRoleEntityType>
}

export const SysUserEntityName = 'SysUserEntity'

export const SysUserEntity = new EntitySchema<SysUserEntityType, BaseEntityType>({
  name: SysUserEntityName,
  tableName: 'sys_user',
  extends: BaseEntity,
  properties: {
    userName: { type: 'string', unique: true },
    nickName: { type: 'string', nullable: true },
    password: { type: 'string' },
    email: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    sex: { type: 'string', nullable: true },
    avatar: { type: 'string', nullable: true },
    isAvailable: { type: 'enum', enum: true, items: () => YesOrNo.values },
    isDelete: { type: 'enum', enum: true, items: () => YesOrNo.values },
    remark: { type: 'string', nullable: true },
    depts: { kind: 'm:n', entity: () => SysDeptEntity, ref: true, pivotTable: 'rel_user_dept', joinColumn: 'user_id', inverseJoinColumn: 'dept_id' },
    posts: { kind: 'm:n', entity: () => SysPostEntity, ref: true, pivotTable: 'rel_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' },
    roles: { kind: 'm:n', entity: () => SysRoleEntity, ref: true, pivotTable: 'rel_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' },
  },
})
