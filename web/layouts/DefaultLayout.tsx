import { pick } from 'es-toolkit/compat'
import { PlusBreadcrumbProps, PlusHeaderProps, PlusLayout, PlusSidebarProps } from 'plus-pro-components'
import { joinURL } from 'ufo'
import { RouteRecordRaw } from 'vue-router'

function filterRoutes(routes: RouteRecordRaw[], basePath = '/') {
  return routes.map((v) => {
    if (v.children) {
      // @ts-ignore
      v.children = filterRoutes(v.children, v.path)
    }
    v.path = joinURL(basePath, v.path)
    return pick(v, ['path', 'name', 'meta', 'children'])
  })
}

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const filteredRoutes = computed(() => filterRoutes(routes))

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
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
