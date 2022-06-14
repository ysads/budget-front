<template>
  <header class="category-group-header">
    <div class="category-group-header__name" data-test="category-group-name">
      {{ categoryGroup.name }}
    </div>
    <div class="category-group-header__total" data-test="budgeted">
      {{ format(totalBalance(monthlyBudgets, 'budgeted'), moneySettings) }}
    </div>
    <div class="category-group-header__total" data-test="activity">
      {{ format(totalBalance(monthlyBudgets, 'activity'), moneySettings) }}
    </div>
    <div class="category-group-header__total" data-test="available">
      {{ format(totalBalance(monthlyBudgets, 'available'), moneySettings) }}
    </div>
  </header>
</template>

<script lang="ts">
import { currencySettings, format, totalBalance } from '@/support/money';
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

  setup(props) {
    const moneySettings = currencySettings(props.budget);

    return {
      format,
      moneySettings,
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

  &__name {
    flex-basis: 40%;
    font-weight: 600;
  }

  &__total {
    flex-basis: 20%;
    text-align: right;
  }
}
</style>
