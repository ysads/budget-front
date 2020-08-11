<template>
  <nav class="account-header">
    <h1 class="account-header__title">{{ name }}</h1>

    <div class="account-header__balance-group">
      <div class="account-header__balance">
        <p class="account-header__balance-title">
          {{ $t('cleared') }}
        </p>
        <p class="account-header__balance-currency">
          {{ $n(cleared, 'currency') }}
        </p>
      </div>

      <div class="account-header__balance">
        <p class="account-header__balance-title">
          {{ $t('uncleared') }}
        </p>
        <p class="account-header__balance-currency">
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
}
</script>

<style lang="scss" scoped>
.account-header {
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: space-between;
  padding: $base * 3;

  @include breakpoint(md) {
    flex-flow: row;
  }

  background: darkslategrey;
  color: white;

  &__title {
    @extend %h1;
  }

  &__balance {
    text-align: center;

    &-group {
      @include margin(top, 4);

      display: flex;

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
    @include margin(left, 4);
  }
}
</style>
