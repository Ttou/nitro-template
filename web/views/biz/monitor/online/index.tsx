export default defineComponent({
  setup() {
    const pageInstance = ref<PlusPageInstance>()
    const selectedIds = ref<string[]>([])

    const columns = computed<PlusColumn[]>(() => [
      {
        label: '会话编号',
        prop: 'tokenId',
        hideInSearch: true,
      },
      {
        label: '登录名称',
        prop: 'user.userName',
      },
      {
        label: '主机',
        prop: 'ip',
        hideInSearch: true,
      },
      {
        label: '登录地点',
        prop: 'location',
        hideInSearch: true,
      },
      {
        label: '浏览器',
        prop: 'browser',
        hideInSearch: true,
      },
      {
        label: '操作系统',
        prop: 'os',
        hideInSearch: true,
      },
      {
        label: '登录时间',
        prop: 'loginDate',
        hideInSearch: true,
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
                text: '下线',
                code: 'delete',
                props: (row, index, button) => ({
                  type: 'warning',
                  disabled: row.isBuiltin === YesOrNoDict.enum.YES,
                }),
                confirm: {
                  message: ({ row }) => `确定下线【${row.configName}】吗？`,
                  options: {
                    type: 'warning',
                  },
                },
                onConfirm({ row }) {
                  // removeHook.confirmRemove([row.id])
                },
              },
            ],
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

    return {
      pageInstance,
      pageProps,
      selectedIds,
    }
  },
  render() {
    return (
      <Fragment>
        <PlusPage
          ref="pageInstance"
          {...this.pageProps}
        >
        </PlusPage>
      </Fragment>
    )
  },
})
