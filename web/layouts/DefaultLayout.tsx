import { ElMessageBox, ElSpace } from 'element-plus'
import { cloneDeep, pick } from 'es-toolkit/compat'
import { PlusDrawerForm } from 'plus-pro-components'
import { match } from 'ts-pattern'
import { joinURL } from 'ufo'
import { Transition, useTemplateRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'

import AppTabs from '../components/AppTabs/AppTabs'
import DarkToggle from '../components/DarkToggle/DarkToggle'
import LangSelect from '../components/LangSelect/LangSelect'
import UpdatePassword from '../components/UpdatePassword/UpdatePassword'
import UpdateProfile from '../components/UpdateProfile/UpdateProfile'

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    const updatePasswordRef = useTemplateRef<InstanceType<typeof UpdatePassword>>('updatePasswordRef')
    const updateProfileRef = useTemplateRef<InstanceType<typeof UpdateProfile>>('updateProfileRef')

    // @ts-ignore
    const filteredRoutes = computed(() => filterRoutes(cloneDeep(userStore.routes)))

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
        dropdownList: [
          { label: '修改密码', value: 'password' },
          { label: '个人中心', value: 'profile' },
        ],
        onClickDropdownItem: (item: any) => {
          match(item.value as 'logout' | 'profile' | 'password')
            .with('logout', () => {
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
            })
            .with('profile', () => {
              updateProfileRef.value.open()
            })
            .with('password', () => {
              updatePasswordRef.value.open()
            })
            .exhaustive()
        },
      }
    })

    // @ts-ignore
    const sidebarProps = computed<PlusSidebarProps>(() => {
      return {
        routes: unref(filteredRoutes),
        defaultActive: route.path,
      }
    })

    function filterRoutes(routes: RouteRecordRaw[], basePath = '/') {
      return routes
        .filter(v => v.meta?.hideInSidebar !== true)
        .map((v: any) => {
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

    return {
      headerProps,
      sidebarProps,
    }
  },
  render() {
    return (
      <PlusLayout
        headerProps={this.headerProps}
        sidebarProps={this.sidebarProps}
        hasBreadcrumb={false}
      >
        {{
          ['header-right']: () => (
            <div style={{ marginRight: '12px' }}>
              <ElSpace>
                <DarkToggle />
                <LangSelect />
              </ElSpace>
              <UpdatePassword ref="updatePasswordRef" />
              <UpdateProfile ref="updateProfileRef" />
            </div>
          ),
          ['layout-extra']: () => (
            <>
              <AppTabs />
            </>
          ),
          ['default']: () => (
            <RouterView>
              {{
                ['default']: ({ Component, route }) => (
                  <Transition name="fade-slide" mode="out-in" appear>
                    <Component key={route.path} />
                  </Transition>
                ),
              }}
            </RouterView>
          ),
        }}
      </PlusLayout>
    )
  },
})
