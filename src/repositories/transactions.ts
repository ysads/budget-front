import { post } from '@/api';
import { ref } from 'vue';
import { upsertAccount } from '@/repositories/accounts';
import { upsertPayee } from '@/repositories/payees';
import { Transaction } from '@/types/models';

interface ApiTransactionRequest extends Transaction {
  budgetId: string;
}

export const transactions = ref<Transaction[]>([]);

export const createTransaction = async (params: ApiTransactionRequest) => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`,
    params,
  );

  transactions.value = [...transactions.value, response];

  upsertPayee(response.payee);
  upsertAccount(response.origin);
};
