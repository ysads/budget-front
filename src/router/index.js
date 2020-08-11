import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: 'accounts',
        name: 'AllAccounts',
        component: () => import('@/views/dashboard/AllAccounts'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
