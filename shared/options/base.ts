export abstract class BaseOptionsFactory {
  /**
   * 构建选项
   */
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
