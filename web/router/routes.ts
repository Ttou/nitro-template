import { House, Monitor } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('../layouts/DefaultLayout'),
    meta: { title: '首页', icon: h(House) },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/biz/home'),
      },
    ],
  },
  {
    path: '/system',
    component: () => import('../layouts/DefaultLayout'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: h(Monitor) },
    children: [
      {
        path: 'user',
        component: () => import('../views/biz/system/user'),
        meta: { title: '用户管理' },
      },
      {
        path: 'config',
        component: () => import('../views/biz/system/config'),
        meta: { title: '配置管理' },
      },
    ],
  },
]
