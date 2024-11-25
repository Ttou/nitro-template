import { PlusPage } from 'plus-pro-components'

export default defineComponent({
  setup() {
    // @ts-ignore
    const plusPageProps = computed<PlusPageProps>(() => {
      return {
        columns: [],
        table: {
          hasIndexColumn: true,
          indexTableColumnProps: {
            label: '序号',
          },
        },
        request: async (params) => {
          // const res = await userApi.findPage(params)

          // return res.data
        },
        searchCardProps: {
          shadow: 'never',
        },
        tableCardProps: {
          shadow: 'never',
        },
      }
    })

    return {
      plusPageProps,
    }
  },
  render() {
    return <PlusPage {...this.plusPageProps}></PlusPage>
  },
})
