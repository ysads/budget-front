<template>
  <div class="all-acounts">
    <account-header
      :budget="openBudget"
      :name="t('allAccounts')"
      :cleared="totalBalance(accounts, 'clearedBalance')"
      :uncleared="totalBalance(accounts, 'unclearedBalance')"
      data-test="header"
    />
  </div>
</template>

<script>
import AccountHeader from '@/components/accounts/AccountHeader'
import { openBudget } from '@/repositories/budgets'
import { accounts } from '@/repositories/accounts'
import { totalBalance } from '@/support/money'
import { useI18n } from '@/use/i18n'

export default {
  name: 'AllAccounts',

  components: {
    AccountHeader,
  },

  setup () {
    const { t } = useI18n()

    return { accounts, openBudget, totalBalance, t }
  },
}
</script>
