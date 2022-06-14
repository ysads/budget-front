import { getAccountById } from '@/repositories/accounts';
import { Account, Transaction } from '@/types/models';
import { computed, ComputedRef } from 'vue';

type UseTransferHook = {
  isTransfer: ComputedRef<boolean>;
  originAccount: ComputedRef<Account | undefined>;
  destinationAccount: ComputedRef<Account | undefined>;
};

export default function useTransfer(transaction: Transaction): UseTransferHook {
  const isTransfer = computed(() => Boolean(transaction.linkedTransactionId));
  const originId = !isTransfer.value
    ? transaction.accountId
    : transaction.amount < 0
    ? transaction.accountId
    : transaction.linkedTransactionAccountId;
  const destId = !isTransfer.value
    ? null
    : transaction.amount < 0
    ? transaction.linkedTransactionAccountId
    : transaction.accountId;

  const originAccount = computed(() => getAccountById(originId || ''));
  const destinationAccount = computed(() => getAccountById(destId || ''));

  return { isTransfer, originAccount, destinationAccount };
}
