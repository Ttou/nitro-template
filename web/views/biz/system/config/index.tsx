import { PlusPage, PlusPageInstance, PlusPageProps, useTable } from 'plus-pro-components'

export default defineComponent({
  setup() {
    const plusPageInstance = ref<PlusPageInstance>()

    // @ts-ignore
    const plusPageProps = computed<PlusPageProps>(() => {
      return {
        columns: [
          {
            label: '参数名称',
            prop: 'configName',
          },
          {
            label: '参数键名',
            prop: 'configKey',
          },
          {
            label: '参数键值',
            prop: 'configValue',
          },
          {
            label: '系统内置',
            prop: 'isBuiltin',
          },
          {
            label: '备注',
            prop: 'remark',
          },
          {
            label: '创建时间',
            prop: 'createdAt',
          },
          {
            label: '更新时间',
            prop: 'updatedAt',
          },
        ],
        table: {
          hasIndexColumn: true,
          indexTableColumnProps: {
            label: '序号',
          },
          actionBar: {
            buttons: [
              {
                text: '编辑',
                code: 'update',
                props: { type: 'success' },
              },
              {
                text: '删除',
                code: 'delete',
                confirm: true,
                props: { type: 'warning' },
              },
              {
                text: '查看',
                code: 'view',
                props: { type: 'info' },
              },
            ],
          },
        },
        request: async (params) => {
          return await configApi.findPage(params)
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
      plusPageInstance,
      plusPageProps,
    }
  },
  render() {
    return <PlusPage ref="plusPageInstance" {...this.plusPageProps}></PlusPage>
  },
})
