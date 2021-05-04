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
      <account-toolbar
        :account="account"
        data-test="toolbar"
      />
    </div>
  </div>
</template>

<script>
import { openBudget } from '@/repositories/budgets'
import { getAccountById } from '@/repositories/accounts'
import { useI18n } from '@/use/i18n'
import alert from '@/support/alert'
import AccountHeader from '@/components/accounts/AccountHeader'
import AccountToolbar from '@/components/accounts/AccountToolbar'
import Loading from '@/components/Loading'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'AccountShow',

  components: {
    AccountHeader,
    AccountToolbar,
    Loading,
  },

  setup () {
    const { t } = useI18n()

    return { isEmpty, openBudget, t }
  },

  mounted () {
    if (isEmpty(this.account)) {
      alert.error(this.t('errors.accounts.not-found'))
      this.$router.push({ name: 'AllAccounts' })
    }
  },

  computed: {
    account () {
      return getAccountById(this.$route.params.id) || {}
    },
  },
}
</script>
