const YesOrNoEnum = {
  NO: '0',
  YES: '1',
} as const

const YesOrNoEnumMap = {
  [YesOrNoEnum.NO]: { label: '否' },
  [YesOrNoEnum.YES]: { label: '是' },
} as const

export const YesOrNoDict = new BaseDict(YesOrNoEnum, YesOrNoEnumMap)

export type IYesOrNoEnum = IEnumType<typeof YesOrNoEnum>
