<template>
  <div class="transaction-table-row">
    <span class="transaction-table-row__date" data-test="date">
      {{ d(new Date(transaction.referenceAt), 'short') }}
    </span>
    <span class="transaction-table-row__payee" data-test="payee">
      {{ transaction.payeeName }}
    </span>
    <span class="transaction-table-row__category" data-test="category">
      {{ budgetCategoryName }}
    </span>
    <span class="transaction-table-row__memo" data-test="memo">
      {{ transaction.memo }}
    </span>
    <span
      class="transaction-table-row__amount"
      :class="balanceClasses(transaction.amount)"
      data-test="amount"
    >
      {{ localize(transaction.amount, budget) }}
    </span>
    <span class="transaction-table-row__cleared">
      <sad-icon
        :name="clearedIcon"
        :color="clearedColor"
        :title="clearedTitle"
        data-test="cleared-icon"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { localize, balanceClasses } from '@/support/money';
import { Budget, Transaction } from '@/types/models';
import useI18n from '@/use/i18n';
import useBudgetCategories from '@/use/budget-categories';
import SadIcon from '@/components/sad/SadIcon.vue';

export default defineComponent({
  name: 'TransactionTableRow',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },

  components: {
    SadIcon,
  },

  setup(props) {
    const { d, st } = useI18n('TransactionTableRow');
    const { categoryName } = useBudgetCategories();
    const budgetCategoryName = categoryName(props.transaction);

    const clearedIcon = props.transaction.clearedAt ? 'check' : 'clock';

    const clearedColor = props.transaction.clearedAt ? 'green' : 'disabled';

    const clearedTitle = props.transaction.clearedAt
      ? st('clearedTitle')
      : st('unclearedTitle');

    return {
      balanceClasses,
      budgetCategoryName,
      clearedIcon,
      clearedColor,
      clearedTitle,
      d,
      localize,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-table-row {
  align-items: center;
  display: flex;
  gap: $base * 4;
  padding: $base * 2 $base * 4;

  @extend %body-1;

  &:hover,
  &:focus {
    background: var(--table-focus);
    cursor: pointer;
  }

  &__date {
    flex-basis: 10%;
  }

  &__payee {
    flex-basis: 15%;
  }

  &__category {
    flex-basis: 25%;
  }

  &__memo {
    flex-basis: 20%;
  }

  &__cleared {
    flex-basis: 75px;
    text-align: right;
  }

  &__amount {
    flex-grow: 1;
    flex-shrink: 0;
    padding: $base;
    text-align: right;

    @extend %semi-bold;
  }
}

.negative {
  color: var(--balance-negative);
}

.positive {
  color: var(--balance-positive);
}
</style>
