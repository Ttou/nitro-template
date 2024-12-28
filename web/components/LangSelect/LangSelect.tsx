import { ElOption, ElSelect } from 'element-plus'

import styles from './LangSelect.module.css'

export default defineComponent({
  name: 'LangSelect',
  setup() {
    const appStore = useAppStore()

    const locale = computed(() => appStore.locale)

    const langOptions = computed(() => [
      { label: '简体中文', value: 'zh_CN' },
      { label: 'English', value: 'en_US' },
    ])

    return {
      locale,
      setLocale: appStore.setLocale,
      langOptions,
    }
  },
  render() {
    return (
      <ElSelect class={styles.langSelect} modelValue={this.locale} size="small" onChange={val => this.setLocale(val)}>
        {this.langOptions.map(item => <ElOption value={item.value} label={item.label} />)}
      </ElSelect>
    )
  },
})
