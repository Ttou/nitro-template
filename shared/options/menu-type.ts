import { BaseOptionsFactory } from './base.js'

enum MenuTypeEnum {
  /**
   * 目录
   */
  FOLDER = 'M',
  /**
   * 菜单
   */
  MENU = 'C',
  /**
   * 按钮
   */
  BUTTON = 'F',
}

/**
 * 菜单类型
 */
export class MenuType extends BaseOptionsFactory {
  static readonly enum = MenuTypeEnum

  static readonly labels = ['目录', '菜单', '按钮']
}
