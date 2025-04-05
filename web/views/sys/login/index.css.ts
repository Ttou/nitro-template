import { style } from '@vanilla-extract/css'

export const loginView = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
})

export const loginForm = style({
  width: '400px',
  height: '300px',
})

export const loginFormHeader = style({
  textAlign: 'center',
  fontSize: '84px',
  color: 'var(--el-color-primary)',
})

export const loginFormFooter = style({
  width: '100%',
})

export const loginBtn = style({
  width: '100%',
})
