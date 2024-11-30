import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElMessage, ElMessageBox, ElNotification, ElSpace } from 'element-plus'
import { PlusDialogForm, PlusPage, PlusPageInstance, PlusPageProps } from 'plus-pro-components'

import { useCreate } from './hooks/useCreate'
import { useEdit } from './hooks/useEdit'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    // @ts-ignore
    const pageProps = computed<PlusPageProps>(() => {
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
            valueType: 'select',
            options: YesOrNo.options,
          },
          {
            label: '备注',
            prop: 'remark',
            hideInSearch: true,
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            valueType: 'date-picker',
            hideInSearch: true,
          },
          {
            label: '更新时间',
            prop: 'updatedAt',
            valueType: 'date-picker',
            hideInSearch: true,
          },
        ],
        search: {
          showNumber: 3,
        },
        table: {
          hasIndexColumn: true,
          isSelection: true,
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
                props: { type: 'warning' },
                confirm: {
                  message: ({ row }) => `确定删除【${row.configName}】吗？`,
                  options: {
                    type: 'warning',
                  },
                },
                onConfirm({ row }) {
                  confirmRemove([row.id])
                },
              },
            ],
          },
          onSelectionChange: (data: any[]) => {
            selectedIds.value = [...data].map(item => item.id)
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

    const { createVisible, createValues, createDialogProps, createFormProps, showCreate, confirmCreate } = useCreate({ pageInstance })
    const { editVisible, editValues, editDialogProps, editFormProps, showEdit, confirmEdit } = useEdit({ pageInstance })

    function confirmRemove(ids: string[], batch: boolean = false) {
      if (batch) {
        if (!selectedIds.value.length) {
          ElMessage.warning('请选择要删除的数据')
          return
        }

        ElMessageBox.confirm('确定删除选中的数据吗？', {
          type: 'warning',
          title: '提示',
        })
          .then(() => {

          }).catch(() => {})
      }
      else {
        configApi.remove({ ids })
          .then(() => {
            ElNotification.success({ title: '通知', message: '删除成功' })
            pageInstance.value.getList()
          })
      }
    }

    return {
      pageInstance,
      pageProps,
      selectedIds,
      createVisible,
      createValues,
      createDialogProps,
      createFormProps,
      showCreate,
      confirmCreate,
      editVisible,
      editValues,
      editDialogProps,
      editFormProps,
      confirmEdit,
      confirmRemove,
    }
  },
  render() {
    return (
      <Fragment>
        <PlusPage
          ref="pageInstance"
          {...this.pageProps}
        >
          {{
            ['table-title']: () => (
              <ElSpace>
                <ElButton
                  type="primary"
                  icon={Plus}
                  onClick={this.showCreate}
                >
                  添加
                </ElButton>
                <ElButton
                  type="danger"
                  icon={Delete}
                  onClick={() => this.confirmRemove(this.selectedIds, true)}
                >
                  批量删除
                </ElButton>
              </ElSpace>
            ),
          }}
        </PlusPage>
        {/* 新增 */}
        <PlusDialogForm
          v-model:visible={this.createVisible}
          v-model={this.createValues}
          dialog={this.createDialogProps}
          form={this.createFormProps}
          onConfirm={this.confirmCreate}
        />
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
