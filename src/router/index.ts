import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Auth' },
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
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: '/settings',
    component: () => import('@/views/Settings.vue'),
    children: [
      {
        path: 'budgets',
        name: 'BudgetSettings',
        component: () => import('@/views/settings/Budgets.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
