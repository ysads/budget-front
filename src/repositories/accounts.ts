import { get, post } from '@/api';
import { computed, ref } from 'vue';
import { upsert } from '@/support/collection';
import { Account, AccountType } from '@/types/models';
import { BudgetReq } from '@/types/api';

interface ApiAccountCreateRequest {
  accountName: string;
  accountType: AccountType;
  budgetId: string;
  currentBalance: number;
  payeeName: string;
}

export const accounts = ref<Account[]>([]);

export const budgetAccounts = computed(() => {
  return accounts.value.filter((a) => a.nature === 'budget');
});

export const trackingAccounts = computed(() => {
  return accounts.value.filter((a) => a.nature === 'tracking');
});

export const createAccount = async ({
  budgetId,
  ...rest
}: ApiAccountCreateRequest) => {
  const account = await post(`budgets/${budgetId}/accounts`, rest);

  accounts.value = [...accounts.value, account];
};

export const getAccounts = async ({ budgetId }: BudgetReq) => {
  accounts.value = await get(`budgets/${budgetId}/accounts`);
};

export const getAccountById = (id: string) => {
  return accounts.value.find((a) => a.id === id);
};

export const upsertAccount = async (account: Account) => {
  accounts.value = upsert<Account>(accounts.value, account);
};
