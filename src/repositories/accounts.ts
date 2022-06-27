import { get, post } from '@/api';
import { computed, ref } from 'vue';
import { upsert } from '@/support/collection';
import { refreshMonth } from './months';
import { Account, AccountType } from '@/types/models';
import { BudgetReq } from '@/types/api';

interface AccountCreateReq {
  accountName: string;
  accountType: AccountType;
  budgetId: string;
  currentBalance: number;
  payeeName: string;
}

export const accounts = ref<Account[]>([]);

export const isLoadingAccounts = ref(false);

export const budgetAccounts = computed(() => {
  return accounts.value.filter((a) => a.nature === 'budget');
});

export const trackingAccounts = computed(() => {
  return accounts.value.filter((a) => a.nature === 'tracking');
});

export const createAccount = async ({
  budgetId,
  ...rest
}: AccountCreateReq): Promise<void> => {
  const account = await post(`budgets/${budgetId}/accounts`, rest);

  accounts.value = [...accounts.value, account];

  // INFO: needed so current month totals reflect the increase coming
  // from account balance
  refreshMonth();
};

export const getAccounts = async ({ budgetId }: BudgetReq): Promise<void> => {
  isLoadingAccounts.value = true;
  accounts.value = await get(`budgets/${budgetId}/accounts`);
  isLoadingAccounts.value = false;
};

export const getAccountById = (id: string): Account | undefined => {
  return accounts.value.find((a) => a.id === id);
};

export const upsertAccount = async (account: Account): Promise<void> => {
  accounts.value = upsert<Account>(accounts.value, account);
};
