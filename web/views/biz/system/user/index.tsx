import { ElButton, ElSpace } from 'element-plus'

import IconEpDelete from '~icons/ep/delete'
import IconEpPlus from '~icons/ep/plus'

import { useCreate } from './hooks/useCreate'
import { useRemove } from './hooks/useRemove'
import { useUpdate } from './hooks/useUpdate'

export default defineComponent({
  setup() {
    const pageInstance = shallowRef<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    // @ts-ignore
    const columns = computed<PlusColumn[]>(() => [
      {
        label: '账号',
        prop: 'userName',
        fieldProps: {
          disabled: unref(updateHook.updateVisible),
        },
      },
      {
        label: '密码',
        prop: 'password',
        fieldProps: {
          type: 'password',
        },
        hideInSearch: true,
        hideInTable: true,
        hideInForm: unref(updateHook.updateVisible),
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
        valueType: 'select',
        options: sexEnum.options,
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
        valueType: 'select',
        options: yesOrNoEnum.options,
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
    const plusPageProps = computed<PlusPageProps>(() => {
      return {
        columns: unref(columns),
        search: {
          showNumber: 4,
        },
        table: {
          width: '100%',
          adaptive: true,
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
                props: (row, index, button) => ({
                  type: 'warning',
                }),
                confirm: {
                  message: ({ row }) => `确定删除【${row.nickName}】吗？`,
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

    const createHook = useCreate({ pageInstance, columns })
    const updateHook = useUpdate({ pageInstance, columns })
    const removeHook = useRemove({ pageInstance, selectedIds })

    return {
      pageInstance,
      plusPageProps,
      selectedIds,
      ...createHook,
      ...updateHook,
      ...removeHook,
    }
  },
  render() {
    return (
      <Fragment>
        <PlusPage ref="pageInstance" {...this.plusPageProps}>
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
