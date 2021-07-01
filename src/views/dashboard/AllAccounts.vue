<template>
  <div class="all-acounts">
    <account-header
      :budget="openBudget"
      :name="t('allAccounts')"
      :cleared="totalBalance(accounts, 'clearedBalance')"
      :uncleared="totalBalance(accounts, 'unclearedBalance')"
      data-test="header"
    />
    <account-toolbar data-test="toolbar" />
    <transaction-list
      :transactions="transactions"
      data-test="transaction-list"
    />
  </div>
</template>

<script lang="ts">
import AccountHeader from '@/components/accounts/AccountHeader.vue';
import AccountToolbar from '@/components/accounts/AccountToolbar.vue';
import TransactionList from '@/components/transactions/TransactionList.vue';
import useI18n from '@/use/i18n';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { getTransactions, transactions } from '@/repositories/transactions';
import { totalBalance } from '@/support/money';
import { defineComponent, watchEffect } from 'vue';

export default defineComponent({
  name: 'AllAccounts',

  components: {
    AccountHeader,
    AccountToolbar,
    TransactionList,
  },

  setup() {
    const { t } = useI18n();

    watchEffect(async () => {
      await getTransactions({
        budgetId: openBudget.value.id,
      });
    });

    return { accounts, openBudget, totalBalance, t, transactions };
  },
});
</script>
