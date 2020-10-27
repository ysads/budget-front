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
import { ACCOUNTS, BUDGETS } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import AccountHeader from '@/components/accounts/AccountHeader'
import Loading from '@/components/Loading'

const accountsHelper = createNamespacedHelpers(ACCOUNTS)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  name: 'AccountShow',

  components: {
    AccountHeader,
    Loading,
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

  computed: {
    ...accountsHelper.mapState(['accounts']),
    ...accountsHelper.mapGetters(['getAccountById']),
    ...budgetsHelper.mapState(['openBudget']),
  },

  methods: {
    fetchAccount () {
      if (!this.accounts.length) return

      this.isLoading = true
      this.account = this.getAccountById(this.$route.params.id)
      this.isLoading = false
    },
  },

  watch: {
    '$route.params.id' () {
      this.fetchAccount()
    },

    // Needed for when another component triggers a store update
    'accounts' () {
      this.fetchAccount()
    },
  },
}
</script>
