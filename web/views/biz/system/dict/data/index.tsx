import { ElButton, ElSpace } from 'element-plus'

import IconEpDelete from '~icons/ep/delete'
import IconEpPlus from '~icons/ep/plus'

import { useCreate } from './hooks/useCreate'
import { useRemove } from './hooks/useRemove'
import { useUpdate } from './hooks/useUpdate'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const route = useRoute()

    const dictType = computed(() => route.query.dictType as string)

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '字典标签',
        prop: 'dictLabel',
      },
      {
        label: '字典值',
        prop: 'dictValue',
        fieldProps: {
          disabled: unref(updateHook.updateVisible),
        },
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
        valueType: 'select',
        options: yesOrNoEnum.options,
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
                props: {
                  type: 'warning',
                },
                confirm: {
                  message: ({ row }) => `确定删除【${row.dictLabel}】吗？`,
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
        request: async ({ page, pageSize, ...rest }) => {
          const data = await dictDataApi.findList(rest)

          return { data }
        },
        pagination: false,
        searchCardProps: {
          shadow: 'never',
        },
        tableCardProps: {
          shadow: 'never',
        },
      }
    })

    const createHook = useCreate({ pageInstance, dictType, columns })
    const updateHook = useUpdate({ pageInstance, dictType, columns })
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
        <PlusPage ref="pageInstance" {...this.pageProps}>
          {{
            ['table-title']: () => (
              <ElSpace>
                <ElButton
                  type="primary"
                  icon={IconEpPlus}
                  onClick={this.showCreate}
                >
                  添加
                </ElButton>
                <ElButton
                  type="danger"
                  icon={IconEpDelete}
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
