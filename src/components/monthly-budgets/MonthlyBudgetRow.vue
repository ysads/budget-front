<template>
  <li
    class="category-budget"
    data-test="row"
    tabindex="0"
    role="button"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space="$emit('click')"
  >
    <div class="category-budget__name" data-test="category-name">
      {{ category.name }}
    </div>
    <div class="category-budget__total" data-test="budgeted">
      {{ format(monthlyBudget.budgeted, moneySettings) }}
    </div>
    <div class="category-budget__total" data-test="activity">
      {{ format(monthlyBudget.activity, moneySettings) }}
    </div>
    <div class="category-budget__total">
      <span
        class="category-budget__tag"
        :class="availableClass"
        data-test="available"
      >
        {{ format(monthlyBudget.available, moneySettings) }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { balanceClasses, currencySettings, format } from '@/support/money';
import { Budget, Category, MonthlyBudget } from '@/types/models';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MonthlyBudgetRow',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
    monthlyBudget: {
      type: Object as PropType<MonthlyBudget>,
      required: true,
    },
  },

  setup(props) {
    const availableClass = computed(() => {
      return props.monthlyBudget.available === 0
        ? 'zero'
        : balanceClasses(props.monthlyBudget.available);
    });
    const moneySettings = currencySettings(props.budget);

    return {
      availableClass,
      format,
      moneySettings,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-budget {
  color: var(--table-heading-text);
  cursor: pointer;
  display: flex;
  padding: $base * 3 $base * 4;
  width: 100%;

  @extend %body-1;

  &:hover,
  &:focus {
    background: var(--row-focus-bg);
  }

  &__tag {
    border-radius: var(--balance-pill-radius);
    padding: 4px;
  }

  &__name {
    flex-basis: 40%;
  }

  &__total {
    flex-basis: 20%;
    text-align: right;
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

.zero {
  background: var(--balance-zero-bg);
  color: var(--balance-zero-text);
}
</style>
