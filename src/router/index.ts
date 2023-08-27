import { createRouter, createWebHistory } from "vue-router";
//访问权限 路由守卫
import { useUserStore } from '@/stores'

import Layout from "@/views/Layout/index.vue";
// @ts-ignore
// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
      meta: { title: '登录' }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/home",
  
      children: [
        { path: "/home", component: () => import("@/views/home/index.vue"),meta: { title: '首页' }},
        
        {
          path: "/article",
          component: () => import("@/views/article/index.vue"), meta: { title: '健康百科' }
        },
        {
          path: "/notify",
          component: () => import("@/views/notify/index.vue"),  meta: { title: '消息通知' }
        },
        { path: "/user", component: () => import("@/views/user/index.vue"), meta: { title: '个人中心' } },

      ],
    },
    {
      path: '/user/patient',
      component: () => import('@/views/user/PatientInfo.vue'),
      meta: { title: '家庭档案' }
    }
  ],
});

router.beforeEach((to, from) => {
   // 处理标题
  document.title = `优医问诊-${to.meta.title || ''}`
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) 
  return '/login'
  // 否则不做任何处理
})


export default router;
