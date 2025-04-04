import { Icon } from '@iconify/vue'
import { ElButton, ElSpace } from 'element-plus'

import { useCreate } from './hooks/useCreate'
import { useRemove } from './hooks/useRemove'
import { useUpdate } from './hooks/useUpdate'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '参数名称',
        prop: 'configName',
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '参数标识',
        prop: 'configKey',
        fieldProps: {
          disabled: unref(updateHook.updateVisible),
        },
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '参数键值',
        prop: 'configValue',
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '系统内置',
        prop: 'isBuiltin',
        valueType: 'select',
        options: YesOrNoDict.options(),
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
        valueType: 'select',
        options: YesOrNoDict.options(),
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '备注',
        prop: 'remark',
        hideInSearch: true,
        tableColumnProps: {
          align: 'center',
          showOverflowTooltip: true,
        },
      },
      {
        label: '创建时间',
        prop: 'createdAt',
        valueType: 'date-picker',
        fieldProps: {
          type: 'datetimerange',
        },
        hideInForm: true,
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '更新时间',
        prop: 'updatedAt',
        valueType: 'date-picker',
        hideInSearch: true,
        hideInForm: true,
        tableColumnProps: {
          align: 'center',
        },
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
              return row.isBuiltin !== YesOrNoDict.enum.YES
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
                  updateHook.showUpdate(row)
                },
              },
              {
                text: '删除',
                code: 'delete',
                props: (row, index, button) => ({
                  type: 'warning',
                  disabled: row.isBuiltin === YesOrNoDict.enum.YES,
                }),
                confirm: {
                  message: ({ row }) => `确定删除【${row.configName}】吗？`,
                  options: {
                    type: 'warning',
                  },
                },
                onConfirm({ row }) {
                  removeHook.confirmRemove([row.id])
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

          return await configApi.findPage(rest)
        },
        searchCardProps: {
          shadow: 'never',
        },
        tableCardProps: {
          shadow: 'never',
        },
      }
    })

    const createHook = useCreate({ pageInstance, columns })
    const updateHook = useUpdate({ pageInstance, columns })
    const removeHook = useRemove({ pageInstance, selectedIds })

    return {
      pageInstance,
      pageProps,
      selectedIds,
      ...createHook,
      ...updateHook,
      ...removeHook,
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
                  icon={<Icon icon="ep:plus" />}
                  onClick={this.showCreate}
                >
                  添加
                </ElButton>
                <ElButton
                  type="danger"
                  icon={<Icon icon="ep:delete" />}
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
