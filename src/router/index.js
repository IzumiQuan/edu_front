import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',//空路径重定向
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '/course',
          name: 'course',
          component: () => import('../views/Course.vue'),
          meta: {
            title: '课程',//页面标题
          },
        },
        {
          path: '/activity',
          name: 'activity',
          component: () => import('../views/Activity.vue'),
          meta: {
            title: '活动',
          },
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User.vue'),
          children: [
            {
              path: '/user/info',
              name: 'info',
              component: () => import('../views/Info.vue'),
              meta: {
                title: '个人中心',
              },
            },
          ]
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: '登录',
      },
    },
    
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;//设置标题
  }
  next();
});
export default router
