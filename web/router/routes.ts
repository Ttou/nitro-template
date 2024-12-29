import { RouteRecordRaw } from 'vue-router'

import IconEpHouse from '~icons/ep/house'
import IconEpMonitor from '~icons/ep/monitor'

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('../layouts/DefaultLayout'),
    meta: { onlyShowChildren: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/biz/home'),
        meta: { title: '首页', icon: h(IconEpHouse) },
      },
    ],
  },
  {
    path: '/system',
    component: () => import('../layouts/DefaultLayout'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: h(IconEpMonitor) },
    children: [
      {
        path: 'user',
        component: () => import('../views/biz/system/user'),
        meta: { title: '用户管理' },
      },
      {
        path: 'dept',
        component: () => import('../views/biz/system/dept'),
        meta: { title: '部门管理' },
      },
      {
        path: 'post',
        component: () => import('../views/biz/system/post'),
        meta: { title: '岗位管理' },
      },
      {
        path: 'role',
        component: () => import('../views/biz/system/role'),
        meta: { title: '角色管理' },
      },
      {
        path: 'role/auth',
        component: () => import('../views/biz/system/role/auth'),
        meta: { title: '角色授权', hideInSidebar: true },
      },
      {
        path: 'dict',
        component: () => import('../views/biz/system/dict'),
        meta: { title: '字典管理' },
      },
      {
        path: 'dict/data',
        component: () => import('../views/biz/system/dict/data'),
        meta: { title: '字典数据', hideInSidebar: true },
      },
      {
        path: 'menu',
        component: () => import('../views/biz/system/menu'),
        meta: { title: '菜单管理' },
      },
      {
        path: 'config',
        component: () => import('../views/biz/system/config'),
        meta: { title: '配置管理' },
      },
    ],
  },
]
