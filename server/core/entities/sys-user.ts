import { Collection, EntitySchema } from '@mikro-orm/core'
import { ConditionalKeys } from 'type-fest'

export interface ISysUserEntity extends IBaseEntity {
  userName: string
  nickName?: string
  password: string
  email?: string
  phone?: string
  sex: string
  avatar?: string
  isAvailable: string
  isDelete: string
  remark?: string
  depts: Collection<ISysDeptEntity>
  posts: Collection<ISysPostEntity>
  roles: Collection<ISysRoleEntity>
}

export type ISysUserEntityRelationKeys = ConditionalKeys<ISysUserEntity, Collection<any>>
  | `depts.${ConditionalKeys<ISysDeptEntity, Collection<any>>}`
  | `roles.${ConditionalKeys<ISysRoleEntity, Collection<any>>}`
  | `posts.${ConditionalKeys<ISysPostEntity, Collection<any>>}`

export const sysUserEntity = new EntitySchema<ISysUserEntity, IBaseEntity>({
  name: 'SysUserEntity',
  tableName: 'sys_user',
  extends: baseEntity,
  properties: {
    userName: { type: 'string', unique: true },
    nickName: { type: 'string', nullable: true },
    password: { type: 'string' },
    email: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    sex: { type: 'enum', enum: true, items: () => sexEnum.values },
    avatar: { type: 'string', nullable: true },
    isAvailable: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    isDelete: { type: 'enum', enum: true, items: () => yesOrNoEnum.values },
    remark: { type: 'string', nullable: true },
    depts: { kind: 'm:n', entity: () => sysDeptEntity, ref: true, pivotTable: 'rel_user_dept', joinColumn: 'user_id', inverseJoinColumn: 'dept_id' },
    posts: { kind: 'm:n', entity: () => sysPostEntity, ref: true, pivotTable: 'rel_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' },
    roles: { kind: 'm:n', entity: () => sysRoleEntity, ref: true, pivotTable: 'rel_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' },
  },
})
