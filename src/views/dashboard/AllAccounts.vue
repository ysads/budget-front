<template>
  <div class="all-acounts">
    <account-header
      :name="$t('allAccounts')"
      :cleared="5432"
      :uncleared="-8723"
    />
  </div>
</template>

<script>
import AccountHeader from '@/components/accounts/AccountHeader'

export default {
  name: 'Budget',

  components: {
    AccountHeader,
  },
}
</script>
