import { del, post, put } from '@/api';
import { ApiTransferDelete, ApiTransferMutation } from '@/types/api';
import { Transfer } from '@/types/models';
import { getAccounts } from './accounts';
import { removeTransactionLocally, upsertTransaction } from './transactions';

export const createTransfer = async (params: ApiTransferMutation) => {
  const response = await post(`budgets/${params.budgetId}/transfers`, params);

  response.map((t: Transfer) => upsertTransaction(t));
};

export const updateTransfer = async (params: ApiTransferMutation) => {
  const response = await put(`budgets/${params.budgetId}/transfers`, params);

  response.map((t: Transfer) => {
    removeTransactionLocally(t.id);
    upsertTransaction(t);
  });
};

export const deleteTransfer = async (params: ApiTransferDelete) => {
  await del(`budgets/${params.budgetId}/transfers`, params);
  await getAccounts({ budgetId: params.budgetId });

  // FIXME: this implies two consecutive renders. maybe we should remove both
  // transactions at the same time
  removeTransactionLocally(params.destinationTransactionId);
  removeTransactionLocally(params.originTransactionId);
};
