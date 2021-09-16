import { get, post, put } from '@/api';
import { ref } from 'vue';
import { upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';
import { Transaction } from '@/types/models';
import { ApiTransactionMutation, ApiTransactionFetch } from '@/types/api';
import { upsert } from '@/support/collection';

export const transactions = ref<Transaction[]>([]);

export const createTransaction = async (
  params: ApiTransactionMutation,
): Promise<void> => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`,
    params,
  );

  upsertTransaction(response);
};

export const updateTransaction = async (
  params: ApiTransactionMutation,
): Promise<void> => {
  const response = await put(
    `budgets/${params.budgetId}/transactions/${params.id}`,
    params,
  );

  upsertTransaction(response);
};

export const getTransactions = async (
  params: ApiTransactionFetch,
  upsert = false,
): Promise<void> => {
  const response = await get(`budgets/${params.budgetId}/transactions`, params);

  if (upsert) {
    response.map((t: Transaction) => upsertTransaction(t));
  } else {
    transactions.value = response;
  }
};

// eslint-disable-next-line
export const upsertTransaction = (response: any): void => {
  const { payee, account, ...transaction } = response;

  transactions.value = upsert(transactions.value, transaction);
  upsertPayee(payee);
  upsertAccount(account);
};

export const removeTransaction = (id: string): void => {
  transactions.value = transactions.value.filter(
    (t: Transaction) => t.id !== id,
  );
};
