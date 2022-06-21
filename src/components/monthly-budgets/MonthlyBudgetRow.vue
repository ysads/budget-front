<template>
  <li
    class="category-budget"
    data-test="row"
    tabindex="0"
    role="button"
    @click="$emit('select')"
    @keydown.enter="$emit('select')"
    @keydown.space="$emit('select')"
  >
    <div class="category-budget__top">
      <div class="category-budget__name" data-test="category-name">
        {{ category.name }}
      </div>
      <span
        class="category-budget__tag"
        :class="availableClass"
        data-test="available"
      >
        {{ format(monthlyBudget.available, moneySettings) }}
      </span>
    </div>

    <div class="category-budget__bottom">
      <p class="category-budget__spent" data-test="spent">
        {{ spentText }}
      </p>
      <sad-progress
        class="category-budget__progress"
        :color="progressColor"
        :value="spentPercentage"
        data-test="progress"
      />
    </div>
  </li>
</template>

<script lang="ts">
import {
  balanceClasses,
  currencySettings,
  format,
  ZeroableBalance,
} from '@/support/money';
import { Budget, Category, MonthlyBudget } from '@/types/models';
import { useI18n } from 'vue-i18n';
import { computed, defineComponent, PropType } from 'vue';
import SadProgress, { ProgressColor } from '../sad/SadProgress.vue';

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

  components: {
    SadProgress,
  },

  emits: ['select'],

  setup(props) {
    const { t } = useI18n();
    const absActivity = computed(() => Math.abs(props.monthlyBudget.activity));
    const absBudgeted = computed(() => Math.abs(props.monthlyBudget.budgeted));

    const availableClass = computed<ZeroableBalance>(() => {
      return props.monthlyBudget.available === 0
        ? 'zero'
        : balanceClasses(props.monthlyBudget.available);
    });
    const moneySettings = currencySettings(props.budget);

    const spentPercentage = computed(() => {
      if (absActivity.value > absBudgeted.value) return 100;
      return Math.round((absActivity.value / absBudgeted.value) * 100);
    });
    const spentText = computed(() => {
      if (absBudgeted.value === 0) {
        return t('MonthlyBudgetRow.notBudgeted', {
          percentage: spentPercentage.value,
          activity: format(absActivity.value, moneySettings),
          budgeted: format(absBudgeted.value, moneySettings),
        });
      }

      return t('MonthlyBudgetRow.spent', {
        percentage: spentPercentage.value,
        activity: format(absActivity.value, moneySettings),
        budgeted: format(absBudgeted.value, moneySettings),
      });
    });
    const progressColor = computed<ProgressColor>(() => {
      if (availableClass.value === 'negative') return 'red';
      if (availableClass.value === 'zero') return 'green';

      return 'blue';
    });

    return {
      availableClass,
      format,
      moneySettings,
      progressColor,
      spentText,
      spentPercentage,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-budget {
  cursor: pointer;
  display: flex;
  flex-flow: column;
  padding: $base * 3 $base * 4;
  width: 100%;

  &:hover,
  &:focus {
    background: var(--row-focus-bg);
  }

  &__top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__bottom {
    display: flex;
    flex-flow: column;

    @include breakpoint(md) {
      flex-flow: row;
    }
  }

  &__tag {
    border-radius: var(--balance-pill-radius);
    padding: 4px;
  }

  &__name {
    font-size: var(--font-body2);
  }

  &__spent {
    color: var(--text-secondary);

    @include breakpoint(md) {
      flex-grow: 1;
    }
  }

  &__progress {
    margin-top: 8px;
    width: 100%;

    @include breakpoint(md) {
      flex-basis: 50%;
    }
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
