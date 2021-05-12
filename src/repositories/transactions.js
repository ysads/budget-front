import { get, post } from '@/api';
import { ref } from 'vue';
import { upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';

export const transactions = ref([]);

export const createTransaction = async (params) => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`,
    params,
  );

  transactions.value = [...transactions.value, response];

  upsertPayee(response.payee);
  upsertAccount(response.origin);
};

export const getTransactions = async (params) => {
  const response = await get(`budgets/${params.budgetId}/transactions`, params);

  transactions.value = response;
};
