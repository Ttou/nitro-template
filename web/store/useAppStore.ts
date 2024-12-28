import i18n, { type ILocale } from '../i18n'

export const useAppStore = defineStore(
  'app', () => {
    const locale = ref<ILocale>('zh_CN')

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
  },
  {
    persist: {
      pick: ['locale'],
    },
  },
)
