import { PlusPage, PlusPageProps } from 'plus-pro-components'

export default defineComponent({
  setup() {
    const route = useRoute()

    // @ts-ignore
    const plusPageProps = computed<PlusPageProps>(() => {
      return {
        columns: [
          {
            label: '账号',
            prop: 'userName',
          },
          {
            label: '昵称',
            prop: 'nickName',
          },
          {
            label: '手机',
            prop: 'phone',
            hideInSearch: true,
          },
          {
            label: '邮箱',
            prop: 'email',
            hideInSearch: true,
          },
          {
            label: '是否可用',
            prop: 'isAvailable',
            valueType: 'select',
            options: YesOrNo.options,
            hideInSearch: true,
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            valueType: 'date-picker',
            hideInSearch: true,
            width: 180,
          },
          {
            label: '更新时间',
            prop: 'updatedAt',
            valueType: 'date-picker',
            hideInSearch: true,
            width: 180,
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
          actionBar: {
            actionBarTableColumnProps: {
              align: 'center',
            },
            buttons: [
              {
                text: '取消授权',
                code: 'cancel',
                props: { type: 'danger' },
                onClick({ row }) {
                  // TODO
                },
              },
            ],
          },
        },
        request: async (params) => {
          return await roleAuthApi.findAllocatedPage({
            id: route.query.id as string,
            ...params,
          })
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
