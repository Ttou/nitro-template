import { Icon } from '@iconify/vue'
import { pascalCase, uniqBy } from 'es-toolkit'
import { h } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const routeComponents = import.meta.glob(`../views/**/index.{jsx,tsx,vue}`)
const loadComponent = (component: string) => {
  return ['jsx', 'tsx', 'vue']
    .map(v => routeComponents[`../views/biz/${component}/index.${v}`])
    .find(v => !!v)
}
const DefaultLayout = () => import('../layouts/DefaultLayout')
const ParentLayout = () => import('../layouts/ParentLayout')

const createMenus = async (menus: any[]) => {
  const res = [] as any[]

  for (const menu of menus) {
    const temp = { ...menu }

    temp.meta = {
      hideInSidebar: temp.isVisible === YesOrNoDict.enum.NO,
      title: temp.menuName,
      icon: temp.icon ? () => h(Icon, { icon: temp.icon }) : null,
    }
    temp.name = pascalCase(menu.menuKey)

    if (menu.parentId === null) {
      temp.component = DefaultLayout
    }
    else if (menu.component === null) {
      temp.component = ParentLayout
    }
    else {
      const component = loadComponent(menu.component)!

      if (component) {
        const module: any = await component()

        temp.component = component
        temp.meta.noCache = temp.isCache === YesOrNoDict.enum.YES

        // 设置异步组件名称以支持缓存
        module.default.name = temp.name
      }
      else {
        console.warn('配置的页面不存在：', menu.component)
      }
    }

    if (temp.children) {
      temp.children = await createMenus(temp.children)
    }

    res.push(temp)
  }

  return res
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref()
    const token = ref('')
    const routes = ref<RouteRecordRaw[]>([])
    const permissions = ref<string[]>([])
    const infoRequested = ref(false)
    const homePath = ref<string>('')

    async function login(data: ILoginDto) {
      const result = await authApi.login(data)

      token.value = result
    }

    async function logout() {
      await authApi.logout()

      await clear()
    }

    async function getInfo() {
      const result = await currentUserApi.getInfo()

      const { roles } = result

      const total = uniqBy(roles.map(role => role.menus).flat(1), menu => menu.id)
      const _menus = total.filter(menu => menu.menuType !== MenuTypeDict.enum.BUTTON)
      const _permissions = total.filter(menu => menu.menuType === MenuTypeDict.enum.BUTTON).map(menu => menu.menuKey)

      permissions.value = _permissions

      const menus = await createMenus(listToTree(_menus))

      // 首页地址默认取菜单第一个
      homePath.value = menus[0].redirect || menus[0].path

      menus.push(
        {
          path: '/',
          redirect: homePath.value,
          meta: { hideInSidebar: true },
        },
        {
          path: '/:pathMatch(.*)*',
          meta: { hideInSidebar: true },
          redirect: {
            path: '/error',
            query: { status: 404 },
          },
        })

      routes.value = menus
      infoRequested.value = true

      return menus
    }

    async function clear() {
      token.value = ''
    }

    return {
      user,
      token,
      routes,
      permissions,
      infoRequested,
      homePath,
      login,
      logout,
      clear,
      getInfo,
    }
  },
  {
    persist: {
      pick: ['token', 'permissions'],
    },
  })
