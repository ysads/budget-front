<template>
  <el-collapse-item
    v-if="accounts.length"
    class="account-accordion"
    :name="name"
  >
    <template slot="title">
      <div class="account-accordion__header">
        <span class="account-accordion__title">{{ label }}</span>
        <span class="account-accordion__total">
          {{ $n(totalBalance, 'currency') }}
        </span>
      </div>
    </template>
    <ul>
      <li
        v-for="account in accounts"
        :key="account.id"
        class="account-accordion__item"
      >
        <span class="account-accordion__item-name">{{ account.name }}</span>
        <span>{{ currencyBalance(account) }}</span>
      </li>
    </ul>
  </el-collapse-item>
</template>

<script>
import { fromCents } from '@/support/money'

export default {
  name: 'AccountAccordion',

  props: {
    accounts: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    totalBalance () {
      return fromCents(
        this.accounts
          .map(a => a.balance)
          .reduce((total, balance) => total + balance),
      )
    },
  },

  methods: {
    currencyBalance (account) {
      return this.$n(fromCents(account.balance), 'currency')
    },
  },
}
</script>

<style lang="scss" scoped>
.account-accordion {
  &__header {
    @extend %caption2;

    @include margin(right, 2);

    display: flex;
    color: var(--sidebar-text);
    justify-content: space-between;
    text-transform: uppercase;
    width: 100%;
  }

  &__item {
    @extend %caption2;

    align-items: center;
    border-radius: $radius-8;
    color: var(--sidebar-text);
    display: flex;
    justify-content: space-between;
    padding: $base * 2 $base * 3;

    &:hover {
      background: var(--sidebar-focus);
      cursor: pointer;
    }

    &__name {
      @include padding(right, 1);
    }
  }

  &__item + &__item {
    @include margin(top, 1);
  }
}
</style>
