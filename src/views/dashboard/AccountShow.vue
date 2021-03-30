<template>
  <div class="account-show">
    <loading
      v-if="isLoading"
      class="account-show__loading"
      data-test="loading"
    />
    <account-header
      v-else
      :name="account.name"
      :cleared="account.clearedBalance"
      :uncleared="account.unclearedBalance"
      :budget="openBudget"
      data-test="header"
    />
  </div>
</template>

<script>
import { openBudget } from '@/repositories/budgets'
import { accounts, getAccountById } from '@/repositories/accounts'
import AccountHeader from '@/components/accounts/AccountHeader'
import Loading from '@/components/Loading'

export default {
  name: 'AccountShow',

  components: {
    AccountHeader,
    Loading,
  },

  setup () {
    return { openBudget }
  },

  data () {
    return {
      account: {},
      isLoading: true,
    }
  },

  async mounted () {
    await this.fetchAccount()
  },

  methods: {
    fetchAccount () {
      if (!accounts.value.length) return

      this.isLoading = true
      this.account = getAccountById(this.$route.params.id)
      this.isLoading = false
    },
  },

  watch: {
    '$route.params.id' () {
      this.fetchAccount()
    },
  },
}
</script>
