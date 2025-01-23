import { ElMessage, ElMessageBox, ElSpace } from 'element-plus'
import { cloneDeep, pick } from 'es-toolkit/compat'
import { joinURL } from 'ufo'
import { RouteRecordRaw } from 'vue-router'

import DarkToggle from '../components/DarkToggle/DarkToggle'
import LangSelect from '../components/LangSelect/LangSelect'
import UpdatePassword from '../components/UpdatePassword/UpdatePassword'
import { useTemplateRef } from 'vue'

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

    const updatePassowrdRef = useTemplateRef<InstanceType<typeof UpdatePassword>>('updatePassowrdRef')

    const filteredRoutes = computed(() => filterRoutes(cloneDeep(routes)))

    const headerProps = computed<PlusHeaderProps>(() => {
      return {
        title: '后台管理',
        dropdownList: [
          { label: '修改密码', value: 'password' } ,
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
          } else if (item.value === 'password') {
            updatePassowrdRef.value?.open()
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
            </div>
          ),
          ['default']: () => (
            <>
              <RouterView />
              <UpdatePassword ref="updatePassowrdRef"/>
            </>
          ),
        }}
      </PlusLayout>
    )
  },
})
