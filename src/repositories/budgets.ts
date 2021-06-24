import { Budget } from '@/types/models';
import { get } from '@/api';
import { ref } from 'vue';

export const openBudget = ref<Budget>({
  id: '',
  currency: 'USD',
  dateFormat: 'dd/MM/YYYY',
  name: 'Budget',
});

export const getBudgetById = async (id: string): Promise<void> => {
  openBudget.value = await get(`budgets/${id}`);
};
