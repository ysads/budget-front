<template>
  <li class="category-budget" @click="$emit('click')">
    <div class="category-budget__name" data-test="category-name">
      {{ category.name }}
    </div>
    <div class="category-budget__total" data-test="budgeted">
      {{ localize(monthlyBudget.budgeted, budget) }}
    </div>
    <div class="category-budget__total" data-test="activity">
      {{ localize(monthlyBudget.activity, budget) }}
    </div>
    <div class="category-budget__total">
      <span
        class="category-budget__tag"
        :class="availableClass"
        data-test="available"
      >
        {{ localize(monthlyBudget.available, budget) }}
      </span>
    </div>
  </li>
</template>

<script>
import { localize, balanceClasses } from '@/support/money'
import { computed } from '@vue/composition-api'

export default {
  name: 'MonthlyBudgetRow',

  props: {
    budget: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    monthlyBudget: {
      type: Object,
      required: true,
    },
  },

  setup ({ monthlyBudget }) {
    const availableClass = computed(() => {
      return monthlyBudget.available === 0
        ? 'zero'
        : balanceClasses(monthlyBudget.available)
    })

    return {
      availableClass,
      localize,
    }
  },
}
</script>

<style lang="scss" scoped>
.category-budget {
  color: var(--table-heading-text);
  cursor: pointer;
  display: flex;
  padding: $base*3 $base*4;
  width: 100%;

  @extend %body-1;

  &:hover,
  &:focus {
    background: #e4f1ff;
  }

  &__tag {
    padding: $base;
    border-radius: var(--radius-4);
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
  background: var(--balance-negative);
  color: var(--text-negative);
}
.positive {
  background: var(--balance-positive);
  color: var(--text-negative);
}
.zero {
  background: var(--balance-zero);
  color: var(--text-negative);
}
</style>
