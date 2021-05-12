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
        data-test="cleared-icon"
      />
    </span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { localize, balanceClasses } from '@/support/money'
import { useI18n } from '@/use/i18n'
import useBudgetCategories from '@/use/budget-categories'
import SadIcon from '@/components/sad/SadIcon'

export default defineComponent({
  name: 'TransactionRowTable',

  props: {
    budget: {
      type: Object,
      required: true,
    },
    transaction: {
      type: Object,
      required: true,
    },
  },

  components: {
    SadIcon,
  },

  setup ({ transaction }) {
    const { d } = useI18n()
    const { categoryName } = useBudgetCategories()
    const budgetCategoryName = categoryName(transaction)

    const clearedIcon = transaction.clearedAt
      ? 'check'
      : 'clock'

    const clearedColor = transaction.clearedAt
      ? 'green'
      : 'disabled'

    return {
      balanceClasses,
      budgetCategoryName,
      clearedIcon,
      clearedColor,
      d,
      localize,
    }
  },
})
</script>

<style lang="scss" scoped>
.transaction-table-row {
  align-items: center;
  display: flex;
  gap: $base*4;
  padding: $base*2 $base*4;

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
    padding: $base;
    flex-grow: 1;
    flex-shrink: 0;
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
