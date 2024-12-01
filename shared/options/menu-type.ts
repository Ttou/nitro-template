import { BaseOptionsFactory } from './base.js'

/**
 * 菜单类型
 */
export class MenuType extends BaseOptionsFactory {
  /**
   * 目录
   */
  static readonly FOLDER = 'M'
  /**
   * 菜单
   */
  static readonly MENU = 'C'
  /**
   * 按钮
   */
  static readonly BUTTON = 'F'

  static readonly options = this.buildOptions(['目录', this.FOLDER], ['菜单', this.MENU], ['按钮', this.BUTTON])
}
