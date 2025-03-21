import { defineEnum, IEnumType } from './base.js'

export const yesOrNoEnum = defineEnum({
  YES: { label: '是', value: '1' },
  NO: { label: '否', value: '0' },
} as const)

export type IYesOrNoEnum = IEnumType<typeof yesOrNoEnum>
