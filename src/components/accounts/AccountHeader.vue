<template>
  <nav class="account-header">
    <h1 class="account-header__title">{{ name }}</h1>

    <div class="account-header__balance-group">
      <div class="account-header__balance">
        <p class="account-header__balance-title">
          {{ $t('cleared') }}
        </p>
        <p
          class="account-header__balance-currency"
          :class="balanceClasses(cleared)"
        >
          {{ $n(cleared, 'currency') }}
        </p>
      </div>

      <div class="account-header__balance">
        <p class="account-header__balance-title">
          {{ $t('uncleared') }}
        </p>
        <p
          class="account-header__balance-currency"
          :class="balanceClasses(uncleared)"
        >
          {{ $n(uncleared, 'currency') }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AccountHeader',

  props: {
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

  &__title {
    @extend %h1;
  }

  &__balance {
    text-align: center;

    &-group {
      display: flex;

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

  @include padding(top, 3);
  @include padding(bottom, 3);
  @include padding(left, 6);
  @include padding(right, 6);

  @include breakpoint(md) {
    flex-flow: row;
  }
}

.positive {
  color: var(--balance-positive);
}

.negative {
  color: var(--balance-negative);
}
</style>
