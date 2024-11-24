import { Collection, EntitySchema } from '@mikro-orm/core'

import { EntityDelFlag, EntityStatus } from '../../constants/enum/entity.enum.js'
import { BaseEntity } from './base.js'
import { UserEntity } from './user.js'

export interface PostEntityType extends BaseEntityType {
  postName: string
  postCode: string
  status: EntityStatus
  delFlag: EntityDelFlag
  remark: string
  users: Collection<UserEntityType>
}

export const PostEntityName = 'PostEntity'

export const PostEntity = new EntitySchema<PostEntityType, BaseEntityType>({
  name: PostEntityName,
  tableName: 'sys_post',
  extends: BaseEntity,
  properties: {
    postName: { type: 'string' },
    postCode: { type: 'string', unique: true },
    status: { type: 'enum', enum: true, items: () => EntityStatus },
    delFlag: { type: 'enum', enum: true, items: () => EntityDelFlag },
    remark: { type: 'string', nullable: true },
    users: { kind: 'm:n', entity: () => UserEntity, mappedBy: user => user.posts },
  },
})
