import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('../views/sys/login'),
      meta: { title: '登录' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
