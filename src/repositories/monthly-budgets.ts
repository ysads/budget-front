import { get, post, put } from '@/api';
import { computed, ref } from 'vue';
import { upsert } from '@/support/collection';
import groupBy from 'lodash/groupBy';
import { MonthlyBudget } from '@/types/models';
import { BudgetReq } from '@/types/api';

export interface ApiMonthlyBudgetRequest extends BudgetReq {
  id: string;
  budgeted: number;
  categoryId: string;
  monthId: string;
}

export const monthlyBudgets = ref<MonthlyBudget[]>([]);

export const createMonthlyBudget = async ({
  budgetId,
  ...rest
}: ApiMonthlyBudgetRequest) => {
  const monthlyBudget = await post(`budgets/${budgetId}/monthly_budgets`, rest);

  monthlyBudgets.value.push(monthlyBudget);
};

export const updateMonthlyBudget = async ({
  budgetId,
  id,
  ...rest
}: ApiMonthlyBudgetRequest) => {
  const monthlyBudget = await put(
    `budgets/${budgetId}/monthly_budgets/${id}`,
    rest,
  );

  monthlyBudgets.value = upsert(monthlyBudgets.value, monthlyBudget);
};

export const getMonthlyBudgets = async ({ budgetId, ...rest }: BudgetReq) => {
  const response = await get(`budgets/${budgetId}/monthly_budgets`, rest);

  monthlyBudgets.value = response;
};

export const monthlyBudgetsByCategoryGroup = computed(() => {
  return groupBy(monthlyBudgets.value, (m) => m.categoryGroupId);
});
