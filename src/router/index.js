import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:budgetId',
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: 'budget',
        name: 'Budget',
        component: () => import('@/views/dashboard/Budget'),
      },
      {
        path: 'budget/:isoMonth',
        name: 'MonthBudget',
        component: () => import('@/views/dashboard/Budget'),
      },
      {
        path: 'accounts',
        name: 'AllAccounts',
        component: () => import('@/views/dashboard/AllAccounts'),
      },
      {
        path: 'accounts/:id',
        name: 'AccountShow',
        component: () => import('@/views/dashboard/AccountShow'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/views/Auth'),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
