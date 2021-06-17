import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'SignIn' },
  },
  {
    path: '/:budgetId',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: 'budget',
        name: 'Budget',
        component: () => import('@/views/dashboard/Budget.vue'),
      },
      {
        path: 'budget/:isoMonth',
        name: 'MonthBudget',
        component: () => import('@/views/dashboard/Budget.vue'),
      },
      {
        path: 'accounts',
        name: 'AllAccounts',
        component: () => import('@/views/dashboard/AllAccounts.vue'),
      },
      {
        path: 'accounts/:id',
        name: 'AccountShow',
        component: () => import('@/views/dashboard/AccountShow.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/views/Auth.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
