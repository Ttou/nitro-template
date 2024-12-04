import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElMessage, ElMessageBox, ElNotification, ElSpace } from 'element-plus'
import { PlusColumn, PlusDialogForm, PlusPage, PlusPageInstance, PlusPageProps } from 'plus-pro-components'

export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '部门名称',
        prop: 'deptName',
      },
      {
        label: '部门标识',
        prop: 'deptKey',
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
          const list = await deptApi.findList(rest)
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

    return {
      pageInstance,
      pageProps,
    }
  },
  render() {
    return (
      <Fragment>
        <PlusPage ref="pageInstance" {...this.pageProps}>

        </PlusPage>
      </Fragment>
    )
  },
})
