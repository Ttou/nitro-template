const MenuTypeEnum = {
  MENU: 'C',
  BUTTON: 'F',
  FOLDER: 'M',
} as const

const MenuTypeEnumMap = {
  [MenuTypeEnum.MENU]: { label: '菜单' },
  [MenuTypeEnum.BUTTON]: { label: '按钮' },
  [MenuTypeEnum.FOLDER]: { label: '目录' },
} as const

export const MenuTypeDict = new BaseDict(MenuTypeEnum, MenuTypeEnumMap)

export type IMenuTypeEnum = IEnumType<typeof MenuTypeEnum>
