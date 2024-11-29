import { PlusPage, PlusPageProps } from 'plus-pro-components'

export default defineComponent({
  setup() {
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
          },
          {
            label: '邮箱',
            prop: 'email',
          },
          {
            label: '性别',
            prop: 'sex',
          },
          {
            label: '头像',
            prop: 'avatar',
            valueType: 'image',
            hideInSearch: true,
          },
          {
            label: '是否可用',
            prop: 'isAvailable',
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            valueType: 'date-picker',
            hideInSearch: true,
            width: 160,
          },
          {
            label: '更新时间',
            prop: 'updatedAt',
            valueType: 'date-picker',
            hideInSearch: true,
            width: 160,
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
        request: async (params) => {
          return await userApi.findPage(params)
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
