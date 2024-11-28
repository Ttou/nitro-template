import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep, pick } from 'es-toolkit/compat'
import { PlusBreadcrumbProps, PlusHeaderProps, PlusLayout, PlusSidebarProps } from 'plus-pro-components'
import { joinURL } from 'ufo'
import { RouteRecordRaw } from 'vue-router'

function filterRoutes(routes: RouteRecordRaw[], basePath = '/') {
  return routes
    .filter(v => v.meta?.hideInSidebar !== true)
    .map((v) => {
      if (v.children) {
      // @ts-ignore
        v.children = filterRoutes(v.children, v.path)

        if (v.meta?.onlyShowChildren) {
          return pick(v.children[0], ['path', 'meta', 'children'])
        }
      }
      v.path = joinURL(basePath, v.path)
      return pick(v, ['path', 'meta', 'children'])
    })
}

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const filteredRoutes = computed(() => filterRoutes(cloneDeep(routes)))

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
        dropdownList: [
          { label: '个人中心', value: 'profile' },
        ],
        onClickDropdownItem: (item) => {
          if (item.value === 'logout') {
            ElMessageBox.confirm('确认退出登录？', {
              title: '提示',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true

                  userStore.logout().then(() => {
                    done()
                    instance.confirmButtonLoading = false
                    router.replace('/login')
                  })
                }
              },
            })
              .then(() => {})
              .catch(() => {})
          }
          else if (item.value === 'profile') {
            ElMessage.warning('暂未实现')
          }
        },
      }
    })

    // @ts-ignore
    const sidebarProps = computed<PlusSidebarProps>(() => {
      return {
        routes: unref(filteredRoutes),
      }
    })

    // @ts-ignore
    const breadcrumbProps = computed<PlusBreadcrumbProps>(() => {
      return {
        routes: unref(filteredRoutes),
      }
    })

    return {
      headerProps,
      sidebarProps,
      breadcrumbProps,
    }
  },
  render() {
    return (
      <PlusLayout
        headerProps={this.headerProps}
        sidebarProps={this.sidebarProps}
        breadcrumbProps={this.breadcrumbProps}
      >
        {{
          default: () => <RouterView />,
        }}
      </PlusLayout>
    )
  },
})
