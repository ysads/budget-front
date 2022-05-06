<template>
  <section class="transaction-list">
    <!-- <transaction-table-header data-test="table-header" /> -->
    <transaction-table-row
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      :budget="openBudget"
      class="transaction-list__item"
      data-test="table-row"
      @select="openDrawer(transaction)"
    />
    <transaction-details
      :transaction="openTransaction"
      :account="openTransaction.account"
      :show="isDrawerOpen && !isTransferOpen"
      data-test="transaction-details"
      @close="closeDrawer"
    />
    <transfer-details
      :transaction="openTransaction"
      :origin="openTransaction.account"
      :show="isDrawerOpen && isTransferOpen"
      data-test="transaction-details"
      @close="closeDrawer"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { openBudget } from '@/repositories/budgets';
import { Transaction } from '@/types/models';
import TransactionTableRow from './TransactionTableRow.vue';
import TransactionDetails from './TransactionDetails.vue';
import TransferDetails from './TransferDetails.vue';

export default defineComponent({
  props: {
    transactions: {
      type: Array as PropType<Transaction[]>,
      required: true,
    },
  },

  components: {
    // TransactionTableHeader,
    TransactionTableRow,
    TransactionDetails,
    TransferDetails,
  },

  setup() {
    const openTransaction = ref({} as Transaction);
    const isDrawerOpen = computed(() => Boolean(openTransaction.value.id));
    const isTransferOpen = computed(() => {
      return Boolean(openTransaction.value.linkedTransactionId);
    });

    const openDrawer = (t: Transaction) => (openTransaction.value = t);
    const closeDrawer = () => (openTransaction.value = {} as Transaction);

    return {
      closeDrawer,
      isDrawerOpen,
      isTransferOpen,
      openBudget,
      openDrawer,
      openTransaction,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-list {
  padding: 10px;

  &__item + &__item {
    margin-top: 8px;
  }
}
</style>
