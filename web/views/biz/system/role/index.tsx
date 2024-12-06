import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElLink, ElMessage, ElMessageBox, ElNotification, ElSpace } from 'element-plus'
import { PlusColumn, PlusDialogForm, PlusPage, PlusPageInstance, PlusPageProps } from 'plus-pro-components'

import { useCreate } from './hooks/useCreate'
import { useUpdate } from './hooks/useUpdate'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const router = useRouter()

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '角色名称',
        prop: 'roleName',
      },
      {
        label: '角色标识',
        prop: 'roleKey',
        fieldProps: {
          disabled: unref(updateVisible),
        },
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
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
        fieldProps: {
          type: 'datetimerange',
        },
        hideInForm: true,
        width: 180,
      },
      {
        label: '更新时间',
        prop: 'updatedAt',
        valueType: 'date-picker',
        hideInSearch: true,
        hideInForm: true,
        width: 180,
      },
    ])

    // @ts-ignore
    const pageProps = computed<PlusPageProps>(() => {
      return {
        columns: unref(columns),
        search: {
          showNumber: 4,
        },
        table: {
          hasIndexColumn: true,
          isSelection: true,
          indexTableColumnProps: {
            label: '序号',
          },
          selectionTableColumnProps: {
            selectable(row, index) {
              return row.isBuiltin !== YesOrNo.YES
            },
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
                  showUpdate(row)
                },
              },
              {
                text: '删除',
                code: 'delete',
                props: (row, index, button) => ({
                  type: 'warning',
                }),
                confirm: {
                  message: ({ row }) => `确定删除【${row.roleName}】吗？`,
                  options: {
                    type: 'warning',
                  },
                },
                onConfirm({ row }) {
                  confirmRemove([row.id])
                },
              },
              {
                text: '分配用户',
                code: 'auth',
                props: { type: 'primary' },
                onClick({ row }) {
                  router.push({ path: '/system/role/auth', query: { id: row.id } })
                },
              },
            ],
          },
          onSelectionChange: (data: any[]) => {
            selectedIds.value = [...data].map(item => item.id)
          },
        },
        request: async (params) => {
          const { createdAt, ...rest } = params

          if (createdAt) {
            rest.beginTime = createdAt[0]
            rest.endTime = createdAt[1]
          }

          return await roleApi.findPage(rest)
        },
        searchCardProps: {
          shadow: 'never',
        },
        tableCardProps: {
          shadow: 'never',
        },
      }
    })

    const { createVisible, createValues, createDialogProps, createFormProps, showCreate, confirmCreate } = useCreate({ pageInstance, columns })
    const { updateVisible, updateValues, updateDialogProps, updateFormProps, showUpdate, confirmUpdate } = useUpdate({ pageInstance, columns })

    function confirmRemove(ids: string[], batch: boolean = false) {
      const handler = () => roleApi.remove({ ids })
        .then(() => {
          ElNotification.success({ title: '通知', message: '删除成功' })
          pageInstance.value.getList()
        })

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
            handler()
          }).catch(() => {})
      }
      else {
        handler()
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
      updateVisible,
      updateValues,
      updateDialogProps,
      updateFormProps,
      confirmUpdate,
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
        {/* 更新 */}
        <PlusDialogForm
          v-model:visible={this.updateVisible}
          v-model={this.updateValues}
          dialog={this.updateDialogProps}
          form={this.updateFormProps}
          onConfirm={this.confirmUpdate}
        />
      </Fragment>
    )
  },
})
