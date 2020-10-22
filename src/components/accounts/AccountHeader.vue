<template>
  <nav class="account-header">
    <h1 class="account-header__title" data-test="account-name">
      {{ name }}
    </h1>

    <div class="account-header__balance-group">
      <div class="account-header__balance" data-test="cleared">
        <p class="account-header__balance-title">
          {{ t('cleared') }}
        </p>
        <p
          class="account-header__balance-currency"
          :class="balanceClasses(cleared)"
          data-test="cleared-amount"
        >
          {{ localize(cleared, budget) }}
        </p>
      </div>

      <span class="account-header__sep">+</span>

      <div class="account-header__balance" data-test="uncleared">
        <p class="account-header__balance-title">
          {{ t('uncleared') }}
        </p>
        <p
          class="account-header__balance-currency"
          :class="balanceClasses(uncleared)"
          data-test="uncleared-amount"
        >
          {{ localize(uncleared, budget) }}
        </p>
      </div>

      <span class="account-header__sep">=</span>

      <div class="account-header__balance" data-test="current">
        <p class="account-header__balance-title">
          {{ t('currentBalance') }}
        </p>
        <p
          class="account-header__balance-currency"
          :class="balanceClasses(current)"
          data-test="current-amount"
        >
          {{ localize(current, budget) }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import { useMoney } from '@/use/money'
import { useI18n } from '@/use/i18n'

export default {
  name: 'AccountHeader',

  props: {
    budget: {
      type: Object,
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

  setup () {
    const { localize } = useMoney()
    const { t } = useI18n('AccountHeader')

    return { localize, t }
  },

  computed: {
    current () {
      return this.cleared + this.uncleared
    },
  },

  methods: {
    balanceClasses (val) {
      return val >= 0 ? 'positive' : 'negative'
    },
  },
}
</script>

<style lang="scss" scoped>
.account-header {
  align-items: center;
  background: var(--acc-header-bg);
  color: var(--acc-header-text);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: $base*3 $base*6;

  @include breakpoint(md) {
    flex-flow: row;
  }

  @include breakpoint(md) {
    flex-flow: row;
  }

  &__title {
    @extend %h1;
    @extend %ellipsis;
  }

  &__sep {
    @extend %h2;

    color: var(--acc-header-sep);
    margin: 0 $base*3;
  }

  &__balance {
    text-align: center;

    &-group {
      display: flex;
      align-items: center;

      @include margin(top, 4);

      @include breakpoint(md) {
        margin: 0;
      }
    }

    &-title {
      @extend %caption;
    }

    &-currency {
      @extend %h2;
    }
  }

  &__balance + &__balance {
    @include margin(left, 6);
  }
}

.positive {
  color: var(--balance-positive);
}

.negative {
  color: var(--balance-negative);
}
</style>
