<template>
  <nav class="account-header">
    <h1 class="account-header__title" data-test="account-name">
      {{ name }}
    </h1>
    <div
      class="account-header__balance"
      :class="balanceClasses(current)"
      data-test="current"
    >
      {{ format(current, moneySettings) }}
    </div>
  </nav>
</template>

<script lang="ts">
import { currencySettings, format } from '@/support/money';
import { Budget } from '@/types/models';
import useI18n from '@/use/i18n';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AccountHeader',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cleared: {
      type: Number,
      required: true,
    },
    uncleared: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const { t } = useI18n('AccountHeader');
    const current = computed(() => props.cleared + props.uncleared);
    const moneySettings = currencySettings(props.budget);

    return { current, format, moneySettings, t };
  },

  methods: {
    balanceClasses(val: number): string {
      return val >= 0 ? 'positive' : 'negative';
    },
  },
});
</script>

<style lang="scss" scoped>
.account-header {
  align-items: center;
  background-color: var(--acc-header-bg);
  color: var(--acc-header-text);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: $base * 4 $base * 6;

  @extend %h1;

  @include breakpoint(md) {
    flex-flow: row;
  }

  @include breakpoint(md) {
    flex-flow: row;
  }

  &__title {
    @extend %h1;
  }

  &__balance {
    margin-top: 8px;

    @include breakpoint(md) {
      margin-top: 0;
    }
  }
}

.positive {
  color: var(--balance-pos-text);
}

.negative {
  color: var(--balance-neg-text);
}
</style>
