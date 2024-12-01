import { BaseOptionsFactory } from './base.js'

/**
 * 是或否
 */
export class YesOrNo extends BaseOptionsFactory {
  /**
   * 是
   */
  static readonly YES = '1'
  /**
   * 否
   */
  static readonly NO = '0'

  static readonly options = this.buildOptions(['是', this.YES], ['否', this.NO])
}
