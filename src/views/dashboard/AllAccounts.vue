<template>
  <div class="all-acounts">
    <loading v-if="isLoading" data-test="loading" />
    <div v-else>
      <account-header
        :budget="openBudget"
        :name="t('AllAccounts.title')"
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
  </div>
</template>

<script lang="ts">
import AccountHeader from '@/components/accounts/AccountHeader.vue';
import Loading from '@/components/Loading.vue';
import AccountToolbar from '@/components/accounts/AccountToolbar.vue';
import TransactionList from '@/components/transactions/TransactionList.vue';
import { useI18n } from 'vue-i18n';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { getTransactions, transactions } from '@/repositories/transactions';
import { totalBalance } from '@/support/money';
import { defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
  name: 'AllAccounts',

  components: {
    AccountHeader,
    AccountToolbar,
    Loading,
    TransactionList,
  },

  setup() {
    const { t } = useI18n();
    const isLoading = ref(true);

    watchEffect(async () => {
      isLoading.value = true;
      await getTransactions({
        budgetId: openBudget.value.id,
      });
      isLoading.value = false;
    });

    document.title = t('htmlTitle.AllAccounts');

    return { accounts, isLoading, openBudget, totalBalance, t, transactions };
  },
});
</script>
