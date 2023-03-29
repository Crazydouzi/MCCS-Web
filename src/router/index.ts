import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    // beforeEnter: (to: any, from: any, next: any) => {
    //   if (to.name !== 'Login' && !sessionStorage.getItem('user-sessionToken')) next({ name: 'Login' })
    //   else next()
    // },
    redirect:'Home',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'command',
        name: 'Command',
        component: () => import('@/views/Command.vue')
      }, {
        path: 'server',
        component: () => import('@/views/instance/index.vue'),
        redirect: 'Server',
        children: [
          {
            path: '',
            name: 'Server',
            component: () => import('@/views/instance/Instance.vue')
          },{
            path:'manage/:id',
            name:'InstanceManage',
            component:()=>import('@/views/instance/InstanceManage.vue')
          }

        ]
      },
      {
        path: '/account/login',
        name: 'Login',
        component: () => import('@/views/account/login.vue')
      }

    ],
  },

]

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
})

export default router
