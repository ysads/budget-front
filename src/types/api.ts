import { TransactionForm } from '@/use/forms/transaction';
import { TransferForm } from '@/use/forms/transfer';

export type BudgetReq = {
  budgetId: string;
};

export interface ApiTransferMutation extends Omit<TransferForm, 'amount'> {
  amount: number;
}

export interface ApiTransactionMutation
  extends Omit<TransactionForm, 'amount'> {
  amount: number;
}

export interface ApiTransactionFetch {
  budgetId: string;
  accountId?: string;
}
