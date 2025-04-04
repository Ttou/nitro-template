import { globalStyle, style } from '@vanilla-extract/css'

export const appTabs = style({
  padding: '0 20px',
})

export const tabs = style({})

globalStyle(`${tabs} .el-tabs__header`, {
  marginBottom: 0,
})
