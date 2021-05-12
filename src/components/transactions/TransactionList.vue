<template>
  <section>
    <div v-if="!isMobile">
      <transaction-table-header data-test="table-header" />
      <transaction-table-row
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        :budget="openBudget"
        class="transaction"
        data-test="table-row"
      />
    </div>
    <div v-else>
      <transaction-card
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        :budget="openBudget"
        class="transaction"
        data-test="card"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { openBudget } from '@/repositories/budgets'
import useWindowSize from '@/use/window-size'
import TransactionTableHeader from './TransactionTableHeader'
import TransactionTableRow from './TransactionTableRow'
import TransactionCard from './TransactionCard'

export default defineComponent({
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  components: {
    TransactionCard,
    TransactionTableHeader,
    TransactionTableRow,
  },

  setup () {
    const { isMobile } = useWindowSize()

    return { isMobile, openBudget }
  },
})
</script>

<style lang="scss" scoped>
.transaction + .transaction {
  border-top: 1px solid var(--table-separator);
}
</style>
