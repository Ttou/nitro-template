import { Icon } from '@iconify/vue'
import { ElButton, ElLink, ElSpace } from 'element-plus'

import { useCreate } from './hooks/useCreate'
import { useRemove } from './hooks/useRemove'
import { useUpdate } from './hooks/useUpdate'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const router = useRouter()

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '岗位名称',
        prop: 'postName',
        tableColumnProps: {
          align: 'center',
        },
      },
      {
        label: '岗位标识',
        prop: 'postKey',
        fieldProps: {
          disabled: unref(updateHook.updateVisible),
        },
        render(value, data) {
          return (
            <ElLink
              type="primary"
              onClick={() => router.push({ path: '/system/post/auth', query: { id: data.row.id } })}
            >
              {value}
            </ElLink>
          )
        },
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
        fieldProps: {
          type: 'textarea',
          rows: 3,
        },
        tableColumnProps: {
          align: 'center',
          showOverflowTooltip: true,
        },
      },
      {
        label: '创建时间',
        prop: 'createdAt',
        valueType: 'date-picker',
        hideInSearch: true,
        hideInForm: true,
        width: 180,
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
        width: 180,
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
                  message: ({ row }) => `确定删除【${row.postName}】吗？`,
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

          return await postApi.findPage(rest)
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
        <PlusPage ref="pageInstance" {...this.pageProps}>
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
