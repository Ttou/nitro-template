import { withQuery } from 'ufo'
import { createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('../views/sys/login'),
      meta: { title: '登录' },
    },
    {
      path: '/error',
      component: () => import('../views/sys/error'),
      meta: { title: '错误' },
    },
    {
      path: '/redirect',
      component: () => import('../layouts/DefaultLayout'),
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('../views/sys/redirect'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        path: '/error',
        query: { status: 404 },
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  const { token, clear } = userStore

  if (token) {
    if (to.path === '/login') {
      return '/'
    }
    // TODO
  }
  else {
    await clear()

    if (to.path === '/login') {
      return true
    }
    return withQuery('/login', { redirect: to.path })
  }
})

router.afterEach((to, from) => {
  // TODO
})

export { router }
