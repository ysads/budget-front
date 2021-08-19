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
        @click="openDrawer(transaction)"
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
        @click="openDrawer(transaction)"
      />
    </div>
    <transaction-details
      :transaction="openTransaction"
      :origin-account="openTransaction.origin"
      :show="isDrawerOpen"
      data-test="transaction-details"
      @close="closeDrawer"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { openBudget } from '@/repositories/budgets';
import { Transaction } from '@/types/models';
import useWindowSize from '@/use/window-size';
import TransactionTableHeader from './TransactionTableHeader.vue';
import TransactionTableRow from './TransactionTableRow.vue';
import TransactionCard from './TransactionCard.vue';
import TransactionDetails from './TransactionDetails.vue';

export default defineComponent({
  props: {
    transactions: {
      type: Array as PropType<Transaction[]>,
      required: true,
    },
  },

  components: {
    TransactionCard,
    TransactionTableHeader,
    TransactionTableRow,
    TransactionDetails,
  },

  setup() {
    const { isMobile } = useWindowSize();

    const openTransaction = ref({} as Transaction);
    const isDrawerOpen = computed(() => Boolean(openTransaction.value.id));

    const openDrawer = (t: Transaction) => (openTransaction.value = t);
    const closeDrawer = () => (openTransaction.value = {} as Transaction);

    return {
      closeDrawer,
      isDrawerOpen,
      isMobile,
      openBudget,
      openDrawer,
      openTransaction,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction + .transaction {
  border-top: 1px solid var(--table-separator);
}
</style>
