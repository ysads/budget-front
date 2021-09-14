<template>
  <div class="account-show">
    <loading
      v-if="isEmpty(account)"
      class="account-show__loading"
      data-test="loading"
    />
    <div v-else>
      <account-header
        :name="account.name"
        :cleared="account.clearedBalance"
        :uncleared="account.unclearedBalance"
        :budget="openBudget"
        data-test="header"
      />
      <account-toolbar :account="account" data-test="toolbar" />
      <transaction-list
        :transactions="transactions"
        data-test="transaction-list"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { openBudget } from '@/repositories/budgets';
import { getAccountById } from '@/repositories/accounts';
import { getTransactions, transactions } from '@/repositories/transactions';
import { useRoute, useRouter } from 'vue-router';
import { computed, defineComponent, onMounted, watchEffect } from 'vue';
import { Account } from '@/types/models';
import useI18n from '@/use/i18n';
import alert from '@/support/alert';
import AccountHeader from '@/components/accounts/AccountHeader.vue';
import AccountToolbar from '@/components/accounts/AccountToolbar.vue';
import Loading from '@/components/Loading.vue';
import TransactionList from '@/components/transactions/TransactionList.vue';
import isEmpty from 'lodash/isEmpty';

export default defineComponent({
  name: 'AccountShow',

  components: {
    AccountHeader,
    AccountToolbar,
    Loading,
    TransactionList,
  },

  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const account = computed(() => {
      return getAccountById(String(route.params.id)) || ({} as Account);
    });

    const fetchTransactions = () =>
      getTransactions({
        budgetId: openBudget.value.id,
        accountId: account.value.id,
      });

    onMounted(() => {
      if (isEmpty(account.value)) {
        alert.error(t('errors.accounts.not-found'));
        router.push({ name: 'AllAccounts' });
      }
    });

    watchEffect(async () => {
      await fetchTransactions();
    });

    return { account, isEmpty, openBudget, t, transactions };
  },
});
</script>
