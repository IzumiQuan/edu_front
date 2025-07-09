import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',//空路径重定向
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: '登录',//页面标题
      },
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('../views/Class.vue'),
      meta: {
        title: '课程',
      }
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
