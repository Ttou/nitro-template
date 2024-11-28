import { PlusDialogForm, PlusPage, PlusPageInstance, PlusPageProps } from 'plus-pro-components'

import { useEdit } from './hooks/useEdit'

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
            actionBarTableColumnProps: {
              align: 'center',
            },
            buttons: [
              {
                text: '编辑',
                code: 'update',
                props: { type: 'success' },
                onClick({ row }) {
                  showEdit(row)
                },
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

    const { editVisible, editValues, editDialogProps, editFormProps, showEdit, confirmEdit } = useEdit({ plusPageInstance })

    return {
      plusPageInstance,
      plusPageProps,
      editVisible,
      editValues,
      editDialogProps,
      editFormProps,
      confirmEdit,
    }
  },
  render() {
    return (
      <Fragment>
        <PlusPage ref="plusPageInstance" {...this.plusPageProps}></PlusPage>
        {/* 编辑 */}
        <PlusDialogForm
          v-model:visible={this.editVisible}
          v-model={this.editValues}
          dialog={this.editDialogProps}
          form={this.editFormProps}
          onConfirm={this.confirmEdit}
        />
      </Fragment>
    )
  },
})
