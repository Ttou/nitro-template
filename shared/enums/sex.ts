import { defineEnum } from './base.js'

export const sexEnum = defineEnum({
    MALE: { label: '男', value: '1' },
    FEMALE: { label: '女', value: '0' },
    UNKNOWN: { label: '未知', value: '2' },
})
