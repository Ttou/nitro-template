import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElMessage, ElMessageBox, ElNotification, ElSpace } from 'element-plus'

import { useCreate } from './hooks/useCreate'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])
    const tree = ref([])

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '上级菜单',
        prop: 'parentId',
        valueType: 'tree-select',
        fieldProps: {
          data: unref(tree),
          nodeKey: 'id',
          props: {
            label: 'menuName',
            children: 'children',
          },
          checkStrictly: true,
          filterable: true,
        },
        hideInSearch: true,
        hideInTable: true,
      },
      {
        label: '菜单名称',
        prop: 'menuName',
      },
      {
        label: '菜单标识',
        prop: 'menuKey',
      },
      {
        label: '菜单类型',
        prop: 'menuType',
        valueType: 'select',
        options: MenuType.options,
      },
      {
        label: '排序',
        prop: 'orderNum',
        hideInSearch: true,
      },
      {
        label: '路由地址',
        prop: 'path',
        hideInForm: createHook.createValues.value.menuType === MenuType.enum.BUTTON,
      },
      {
        label: '组件路径',
        prop: 'component',
        hideInForm: createHook.createValues.value.menuType === MenuType.enum.BUTTON,
      },
      {
        label: '跳转地址',
        prop: 'redirect',
        hideInForm: createHook.createValues.value.menuType === MenuType.enum.BUTTON,
      },
      {
        label: '图标',
        prop: 'icon',
        hideInSearch: true,
        hideInForm: createHook.createValues.value.menuType === MenuType.enum.BUTTON,
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
        valueType: 'select',
        options: YesOrNo.options,
      },
      {
        label: '是否缓存',
        prop: 'isCache',
        valueType: 'select',
        options: YesOrNo.options,
        hideInSearch: true,
        hideInForm: [MenuType.enum.FOLDER, MenuType.enum.BUTTON].includes(createHook.createValues.value.menuType),
      },
      {
        label: '是否外链',
        prop: 'isFrame',
        valueType: 'select',
        options: YesOrNo.options,
        hideInSearch: true,
        hideInForm: [MenuType.enum.FOLDER, MenuType.enum.BUTTON].includes(createHook.createValues.value.menuType),
      },
      {
        label: '是否可见',
        prop: 'isVisible',
        valueType: 'select',
        options: YesOrNo.options,
        hideInSearch: true,
        hideInForm: createHook.createValues.value.menuType === MenuType.enum.BUTTON,
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
          defaultExpandAll: true,
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
                  // showUpdate(row)
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
                  // confirmRemove([row.id])
                },
              },
            ],
          },
          onSelectionChange: (data: any[]) => {
            selectedIds.value = [...data].map(item => item.id)
          },
        },
        request: async ({ page, pageSize, ...rest }) => {
          const list = await menuApi.findList(rest)
          const data = listToTree(list)

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

    function confirmRemove(ids: string[], batch: boolean = false) {
      const handler = () => dictTypeApi.remove({ ids })
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

    async function getTree() {
      const list = await menuApi.findList({})
      tree.value = listToTree(list)
    }

    const createHook = useCreate({ pageInstance, columns, getTree })

    return {
      pageInstance,
      pageProps,
      ...createHook,
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
                  icon={Plus}
                  onClick={this.showCreate}
                >
                  添加
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
      </Fragment>
    )
  },
})
