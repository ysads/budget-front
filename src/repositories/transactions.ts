import { del, get, post, put } from '@/api';
import { ref } from 'vue';
import { getAccounts, upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';
import { Transaction, Transactionable } from '@/types/models';
import {
  ApiTransactionMutation,
  ApiTransactionFetch,
  ApiTransactionDelete,
} from '@/types/api';
import { upsert } from '@/support/collection';

export const transactions = ref<Transactionable[]>([]);

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
) => {
  const response = await get(`budgets/${params.budgetId}/transactions`, params);

  if (upsert) {
    response.map((t: Transaction) => upsertTransaction(t));
  } else {
    transactions.value = response;
  }
};

export const deleteTransaction = async (params: ApiTransactionDelete) => {
  await del(`budgets/${params.budgetId}/transactions/${params.id}`);
  await getAccounts({ budgetId: params.budgetId });

  removeTransactionLocally(params.id);
};

// eslint-disable-next-line
export const upsertTransaction = (response: any) => {
  const { payee, account, ...transaction } = response;

  transactions.value = upsert(transactions.value, transaction);
  upsertPayee(payee);
  upsertAccount(account);
};

export const removeTransactionLocally = (id: string) => {
  transactions.value = transactions.value.filter(
    (t: Transactionable) => t.id !== id,
  );
};
