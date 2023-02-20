// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    // beforeEnter: (to: any, from: any, next: any) => {
    //   if (to.name !== 'Login' && !sessionStorage.getItem('user-sessionToken')) next({ name: 'Login' })
    //   else next()
    // },
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
