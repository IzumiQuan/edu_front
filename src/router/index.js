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
          path: '/course/:id',
          name: 'courseDetail',
          component: () => import('../views/CourseDetail.vue'),
          props: true,
          meta: {
            title: '课程详情',
          },
        },
        {
          path: '/course/study/:id',
          name: 'courseStudy',
          component: () => import('../views/CourseStudy.vue'),
          props: true,
          meta: {
            title: '课程学习',
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
          path: '/activity/:id',
          name: 'activityDetail',
          component: () => import('../views/ActivityDetail.vue'),
          props: true,
          meta: {
            title: '活动详情',
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
                title: '基本信息',
              },
            },
            {
              path: '/user/study',
              name: 'study',
              component: () => import('../views/StudyLog.vue'),
              meta: {
                title: '学习记录',
              },
            },
            {
              path: '/user/cert',
              name: 'cert',
              component: () => import('../views/StudyCert.vue'),
              meta: {
                title: '学习证书',
              },
            },
            {
              path: '/user/enroll',
              name: 'enroll',
              component: () => import('../views/EnrollLog.vue'),
              meta: {
                title: '学习证书',
              },
            },
            {
              path: '/user/vip',
              name: 'vip',
              component: () => import('../views/Vip.vue'),
              props: true,
              meta: {
                title: '我的会员',
              },
            },
            {
              path: '/user/order',
              name: 'order',
              component: () => import('../views/OrderManager.vue'),
              meta: {
                title: '订单管理',
              },
            },
            {
              path: '/user/bill',
              name: 'bill',
              component: () => import('../views/BillManager.vue'),
              meta: {
                title: '发票管理',
              },
            },
            {
              path: '/user/contact',
              name: 'contact',
              component: () => import('../views/Contact.vue'),
              meta: {
                title: '联系我们',
              },
            },
            {
              path: '/user/safety',
              name: 'safety',
              component: () => import('../views/Safety.vue'),
              meta: {
                title: '账号安全',
              },
            },
            {
              path: '/user/setting',
              name: 'setting',
              component: () => import('../views/Setting.vue'),
              meta: {
                title: '系统设置',
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
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Login.vue'),
      meta: {
        title: '测试',
      },
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title//设置标题
  }
  next();
});
export default router
