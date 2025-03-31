const SexEnum = {
  FEMALE: '0',
  MALE: '1',
  UNKNOWN: '2',
} as const

const SexEnumMap = {
  [SexEnum.FEMALE]: { label: '女' },
  [SexEnum.MALE]: { label: '男' },
  [SexEnum.UNKNOWN]: { label: '未知' },
} as const

export const SexDict = new BaseDict(SexEnum, SexEnumMap)

export type ISexEnum = IEnumType<typeof SexEnum>
