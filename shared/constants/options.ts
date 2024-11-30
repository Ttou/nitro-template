abstract class OptionsFactory {
  static buildOptions(...args: any[][]) {
    return args.map((arg) => {
      return {
        label: arg[0],
        value: arg[1],
      }
    })
  }

  static get options(): Array<{ label: string, value: string | number }> {
    throw new Error('not implemented')
  }

  static get values() {
    return this.options?.map(option => option.value)
  }
}

/**
 * 是或否
 */
export class YesOrNo extends OptionsFactory {
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

/**
 * 菜单类型
 */
export class MenuType extends OptionsFactory {
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
