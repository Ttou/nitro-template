import { House, Monitor } from '@element-plus/icons-vue'
import { PlusBreadcrumbProps, PlusHeaderProps, PlusLayout, PlusRouteRecordRaw, PlusSidebarProps } from 'plus-pro-components'

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    const routes = ref<PlusRouteRecordRaw[]>([
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: <House />,
        },
      },
      {
        path: '/system',
        meta: {
          title: '系统管理',
          icon: <Monitor />,
        },
        children: [
          {
            path: '/system/user',
            meta: {
              title: '用户管理',
            }
          },
        ],
      },
    ])

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
      }
    })

    // @ts-ignore
    const sidebarProps = computed<PlusSidebarProps>(() => {
      return {
        routes: unref(routes),
      }
    })

    // @ts-ignore
    const breadcrumbProps = computed<PlusBreadcrumbProps>(() => {
      return {
        routes: unref(routes),
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
