import { PlusPage, PlusPageInstance, PlusPageProps } from 'plus-pro-components'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()

    // @ts-ignore
    const pageProps = computed<PlusPageProps>(() => {
      return {
        columns: [
          {
            label: '字典名称',
            prop: 'dictName',
          },
          {
            label: '字典类型',
            prop: 'dictType',
            valueType: 'link',
          },
          {
            label: '是否可用',
            prop: 'isAvailable',
            valueType: 'select',
          },
          {
            label: '备注',
            prop: 'remark',
            hideInSearch: true,
          },
        ],
        search: {
          showNumber: 4,
        },
        table: {
          hasIndexColumn: true,
          indexTableColumnProps: {
            label: '序号',
          },
        },
      }
    })

    return {
      pageInstance,
      pageProps,
    }
  },
  render() {
    return <PlusPage ref="pageInstance" {...this.pageProps}></PlusPage>
  },
})
