import { BaseOptionsFactory } from './base.js'

export enum YesOrNoEnum {
  /**
   * 是
   */
  YES = '1',
  /**
   * 否
   */
  NO = '0',
}

/**
 * 是或否
 */
export class YesOrNo extends BaseOptionsFactory {
  static readonly enum = YesOrNoEnum

  static readonly labels = ['是', '否']
}
