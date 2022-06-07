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
import { Budget, CategoryGroup } from '@/types/models';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MonthlyBudgetHeader',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    categoryGroup: {
      type: Object as PropType<CategoryGroup>,
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
});
</script>

<style lang="scss" scoped>
.category-group-header {
  border-top-left-radius: $base;
  border-top-right-radius: $base;
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
