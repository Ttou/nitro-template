import { useStorage } from '@vueuse/core'

import i18n, { type ILocale } from '../i18n'

export const useAppStore = defineStore('app', () => {
  const locale = useStorage<ILocale>('locale', 'zh_CN')

  function setLocale(value: ILocale) {
    locale.value = value
    i18n.global.locale.value = value
  }

  if (locale.value) {
    i18n.global.locale.value = locale.value
  }

  return {
    locale,
    setLocale,
  }
})
