<template>
  <div class="account-toolbar">
    <sad-button
      icon="file-invoice-dollar"
      type="ghost"
      size="small"
      data-test="new-transaction"
      @click="toggle('transactionDrawer')"
    >
      {{ t('newTransaction') }}
    </sad-button>

    <transaction-details
      v-if="isVisible.transactionDrawer"
      :origin-account="account"
      data-test="transaction-drawer"
      @close="toggle('transactionDrawer')"
    />
  </div>
</template>

<script>
import SadButton from '@/components/sad/SadButton'
import TransactionDetails from '@/components/transactions/TransactionDetails'
import { useI18n } from '@/use/i18n'
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    account: {
      type: Object,
      required: true,
    },
  },

  components: {
    SadButton,
    TransactionDetails,
  },

  setup () {
    const { t } = useI18n()
    const isVisible = reactive({
      transactionDrawer: false,
    })
    const toggle = (prop) => {
      isVisible[prop] = !isVisible[prop]
    }

    return { isVisible, t, toggle }
  },
})
</script>

<style lang="scss" scoped>
.account-toolbar {
  border-bottom: 1px solid var(--acc-toolbar-border);
  display: flex;
  justify-content: space-between;
  padding: $base*2 $base*4;
}
</style>
