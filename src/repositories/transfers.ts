import { post, put } from '@/api';
import { ApiTransferMutation } from '@/types/api';
import { Transaction } from '@/types/models';
import { removeTransaction, upsertTransaction } from './transactions';

export const createTransfer = async (
  params: ApiTransferMutation,
): Promise<void> => {
  const response = await post(`budgets/${params.budgetId}/transfers`, params);

  response.map((t: Transaction) => upsertTransaction(t));
};

export const updateTransfer = async (
  params: ApiTransferMutation,
): Promise<void> => {
  const response = await put(`budgets/${params.budgetId}/transfers`, params);

  response.map((t: Transaction) => {
    removeTransaction(t.id);
    upsertTransaction(t);
  });
};
