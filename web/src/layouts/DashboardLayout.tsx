import { House, Monitor } from '@element-plus/icons-vue'
import { PlusBreadcrumbProps, PlusHeaderProps, PlusLayout, PlusRouteRecordRaw, PlusSidebarProps } from 'plus-pro-components'

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    const routes = ref<PlusRouteRecordRaw[]>([
      {
        path: '/home',
        name: '首页',
        meta: {
          icon: <House />,
        },
      },
      {
        path: '/system',
        name: '系统管理',
        meta: {
          icon: <Monitor />,
        },
        children: [
          {
            path: '/system/user',
            name: '用户管理',
          },
        ],
      },
    ])

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
      }
    })

    const sidebarProps = computed<PlusSidebarProps>(() => {
      return {
        routes: unref(routes),
      }
    })

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
