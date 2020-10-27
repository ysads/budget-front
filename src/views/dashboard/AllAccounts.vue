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
import { BUDGETS, ACCOUNTS } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import { useMoney } from '@/use/money'
import { useI18n } from '@/use/i18n'

const accountsHelper = createNamespacedHelpers(ACCOUNTS)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  name: 'AllAccounts',

  components: {
    AccountHeader,
  },

  setup () {
    const { totalBalance } = useMoney()
    const { t } = useI18n()

    return { totalBalance, t }
  },

  computed: {
    ...accountsHelper.mapState(['accounts']),
    ...budgetsHelper.mapState(['openBudget']),
  },
}
</script>
