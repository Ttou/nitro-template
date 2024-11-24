/**
 * 状态
 */
export enum EntityStatus {
  /**
   * 正常
   */
  NORMAL = '0',
  /**
   * 停用
   */
  DISABLE = '1',
}

/**
 * 性别
 */
export enum EntitySex {
  /**
   * 男
   */
  MALE = '0',
  /**
   * 女
   */
  FEMALE = '1',
  /**
   * 未知
   */
  UNKNOWN = '2',
}

/**
 * 删除标志
 */
export enum EntityDelFlag {
  /**
   * 存在
   */
  EXIST = '0',
  /**
   * 删除
   */
  DELETE = '1',
}

/**
 * 菜单类型
 */
export enum EntityMenuType {
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
  BUTTON = 'F'
}