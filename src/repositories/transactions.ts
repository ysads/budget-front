import { get, post } from '@/api';
import { ref } from 'vue';
import { upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';
import { NullishDate, Transaction } from '@/types/models';

interface ApiTransactionReq {
  amount: number;
  clearedAt: NullishDate;
  memo: string;
  categoryId: string;
  originId: string;
  outflow: boolean;
  payeeName: string;
  referenceAt: Date;
  budgetId: string;
}

interface ApiGetTransaction {
  budgetId: string;
  originId?: string;
}

export const transactions = ref<Transaction[]>([]);

export const createTransaction = async (
  params: ApiTransactionReq,
): Promise<void> => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`,
    params,
  );

  transactions.value = [...transactions.value, response];

  upsertPayee(response.payee);
  upsertAccount(response.origin);
};

export const getTransactions = async (
  params: ApiGetTransaction,
): Promise<void> => {
  const response = await get(`budgets/${params.budgetId}/transactions`, params);

  transactions.value = response;
};
