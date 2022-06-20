<template>
  <nav class="account-header">
    <h1 class="account-header__title" data-test="account-name">
      {{ name }}
    </h1>
    <div
      class="account-header__balance"
      :class="balanceClasses(current)"
      data-test="balance"
    >
      {{ format(current, moneySettings) }}
    </div>
  </nav>
</template>

<script lang="ts">
import { currencySettings, format } from '@/support/money';
import { Budget } from '@/types/models';
import { useI18n } from 'vue-i18n';
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
    const { t } = useI18n();
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
  font-size: var(--font-title1);
  justify-content: space-between;
  padding: $base * 4 $base * 6;

  @include breakpoint(md) {
    flex-flow: row;
  }

  @include breakpoint(md) {
    flex-flow: row;
  }

  &__title {
    font-size: var(--font-title1);
    font-weight: 700;
  }

  &__balance {
    font-weight: 700;

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
