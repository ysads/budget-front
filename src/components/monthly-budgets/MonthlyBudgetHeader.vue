<template>
  <header class="category-group-header">
    <div class="category-group-header__name" data-test="category-group-name">
      {{ categoryGroup.name }}
    </div>
    <div class="category-group-header__total" data-test="budgeted">
      {{ localize(totalBalance(monthlyBudgets, 'budgeted'), budget) }}
    </div>
    <div class="category-group-header__total" data-test="activity">
      {{ localize(totalBalance(monthlyBudgets, 'activity'), budget) }}
    </div>
    <div class="category-group-header__total" data-test="available">
      {{ localize(totalBalance(monthlyBudgets, 'available'), budget) }}
    </div>
  </header>
</template>

<script lang="ts">
import { localize, totalBalance } from '@/support/money';

export default {
  name: 'MonthlyBudgetHeader',

  props: {
    budget: {
      type: Object,
      required: true,
    },
    categoryGroup: {
      type: Object,
      required: true,
    },
    monthlyBudgets: {
      type: Array,
      required: true,
    },
  },

  setup() {
    return {
      localize,
      totalBalance,
    };
  },
};
</script>

<style lang="scss" scoped>
.category-group-header {
  background: var(--table-heading);
  border-top-left-radius: $base;
  border-top-right-radius: $base;
  color: var(--table-heading-text);
  display: flex;
  padding: $base * 3 $base * 4;
  width: 100%;

  @extend %body-1;
  @extend %medium;

  &__name {
    flex-basis: 40%;

    @extend %semi-bold;
  }

  &__total {
    flex-basis: 20%;
    text-align: right;
  }
}
</style>
