import { defineEnum } from './base.js'

export const menuTypeEnum = defineEnum({
    FOLDER: { label: '目录', value: 'M' },
    MENU: { label: '菜单', value: 'C' },
    BUTTON: { label: '按钮', value: 'F' },
})
