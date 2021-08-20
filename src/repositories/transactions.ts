import { get, post, put } from '@/api';
import { ref } from 'vue';
import { upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';
import { Transaction } from '@/types/models';
import { ApiTransactionForm } from '@/use/forms/transaction';
import { upsert } from '@/support/collection';

interface ApiGetTransaction {
  budgetId: string;
  originId?: string;
}

export const transactions = ref<Transaction[]>([]);

export const createTransaction = async (
  params: ApiTransactionForm,
): Promise<void> => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`,
    params,
  );

  transactions.value = [...transactions.value, response];

  upsertPayee(response.payee);
  upsertAccount(response.origin);
};

export const updateTransaction = async (
  params: ApiTransactionForm,
): Promise<void> => {
  console.log('params', params);
  const response = await put(
    `budgets/${params.budgetId}/transactions/${params.id}`,
    params,
  );

  const { payee, origin, ...transaction } = response;

  upsert(transactions.value, transaction);
  upsertPayee(payee);
  upsertAccount(origin);
};

export const getTransactions = async (
  params: ApiGetTransaction,
): Promise<void> => {
  const response = await get(`budgets/${params.budgetId}/transactions`, params);

  transactions.value = response;
};
