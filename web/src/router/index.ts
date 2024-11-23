import { createRouter } from 'vue-router'

import DashboardLayout from '../layouts/DashboardLayout'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('../views/sys/login'),
      meta: { title: '登录' },
    },
    {
      path: '/',
      component: DashboardLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('../views/biz/home'),
        },
      ],
    },
    {
      path: '/system',
      component: DashboardLayout,
      redirect: '/system/user',
      children: [
        {
          path: 'user',
          component: () => import('../views/biz/system/user'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  // TODO
})

export { router }
