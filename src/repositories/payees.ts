import { get } from '@/api';
import { ref } from 'vue';
import { Payee } from '@/types/models';
import { upsert } from '@/support/collection';
import { BudgetReq } from '@/types/api';

export const payees = ref<Payee[]>([]);

export const getPayees = async (params: BudgetReq): Promise<void> => {
  const response = await get(`budgets/${params.budgetId}/payees`);

  payees.value = response;
};

export const upsertPayee = (newPayee: Payee): void => {
  if (!newPayee) return;

  payees.value = upsert(payees.value, newPayee);
};
