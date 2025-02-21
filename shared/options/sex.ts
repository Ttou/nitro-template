import { BaseOptionsFactory } from './base.js'

export enum SexEnum {
  /**
   * 男
   */
  MALE = '1',
  /**
   * 女
   */
  FEMALE = '0',
  /**
   * 未知
   */
  UNKNOWN = '2',
}

/**
 * 性别
 */
export class Sex extends BaseOptionsFactory {
  static readonly enum = SexEnum

  static readonly labels = ['男', '女', '未知']
}
