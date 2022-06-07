<template>
  <div class="transaction-card" @click="$emit('click')">
    <div class="transaction-card__row">
      <span class="transaction-card__category" data-test="category">
        {{ budgetCategoryName }}
      </span>
      <span class="transaction-card__date" data-test="date">
        {{ d(new Date(transaction.referenceAt), 'short') }}
      </span>
    </div>
    <div class="transaction-card__row">
      <span class="transaction-card__payee" data-test="payee">
        {{ transaction.payeeName }}
      </span>
    </div>
    <div class="transaction-card__row">
      <span
        class="transaction-card__amount"
        :class="balanceClasses(transaction.amount)"
        data-test="amount"
      >
        {{ localize(transaction.amount, budget) }}
      </span>

      <sad-icon
        class="transaction-card__cleared"
        :name="clearedIcon"
        :color="clearedColor"
        data-test="cleared-icon"
      />
    </div>
    <div
      v-if="transaction.memo"
      class="transaction-card__memo transaction-card__row"
      data-test="memo"
    >
      {{ transaction.memo }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { localize, balanceClasses } from '@/support/money';
import useI18n from '@/use/i18n';
import SadIcon from '@/components/sad/SadIcon';
import useBudgetCategories from '@/use/budget-categories';

// @deprecated
export default defineComponent({
  name: 'TransactionCard',

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

  emits: ['click'],

  setup(props) {
    const { d } = useI18n();
    const { categoryName } = useBudgetCategories();
    const budgetCategoryName = categoryName(props.transaction);

    const clearedIcon = props.transaction.clearedAt ? 'check' : 'clock';

    const clearedColor = props.transaction.clearedAt ? 'green' : 'disabled';

    return {
      balanceClasses,
      budgetCategoryName,
      clearedIcon,
      clearedColor,
      d,
      localize,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-card {
  padding: $base * 4;

  @extend %body-1;

  &:hover,
  &:focus {
    background: var(--table-focus);
    cursor: pointer;
  }

  &__row {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__row + &__row {
    margin-top: $base;
  }

  &__category {
    @extend %caption-2;
  }

  &__date {
    color: var(--color-info);

    @extend %caption-2;
  }

  &__payee {
    @extend %body-2;
  }

  &__amount {
    flex-grow: 1;
    padding-right: $base;

    @extend %body-2;
    @extend %semi-bold;
  }

  &__memo {
    color: var(--color-info);
  }
}

.negative {
  background: var(--balance-neg-bg);
  color: var(--balance-neg-text);
}

.positive {
  background: var(--balance-pos-bg);
  color: var(--balance-pos-text);
}
</style>
