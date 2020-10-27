<template>
  <el-collapse-item
    v-if="accounts.length"
    class="account-accordion"
    :name="name"
    data-test="accordion"
  >
    <template slot="title">
      <div class="account-accordion__header" data-test="title">
        <span class="account-accordion__title">
          {{ label }}
        </span>
        <span class="account-accordion__total">
          {{ localize(total, budget) }}
        </span>
      </div>
    </template>
    <ul>
      <li
        v-for="account in accounts"
        :key="account.id"
        class="account-accordion__item"
        :class="activeClass(account)"
        data-test="account-item"
      >
        <router-link
          :to="{ name: 'AccountShow', params: { id: account.id } }"
          class="account-accordion__item-link"
          data-test="account-link"
        >
          <span class="account-accordion__item-name">
            {{ account.name }}
          </span>
          <span>{{ localize(account.balance, budget) }}</span>
        </router-link>
      </li>
    </ul>
  </el-collapse-item>
</template>

<script>
import { useMoney } from '@/use/money'

export default {
  name: 'AccountAccordion',

  props: {
    accounts: {
      type: Array,
      required: true,
    },
    budget: {
      type: Object,
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

  setup () {
    const { totalBalance, fromCents, localize } = useMoney()

    return { totalBalance, fromCents, localize }
  },

  computed: {
    total () {
      return this.totalBalance(this.accounts, 'balance')
    },

    openAccountId () {
      return this.$route.params.id
    },
  },

  methods: {
    activeClass (account) {
      return (this.openAccountId === account.id) ? 'active' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.account-accordion {
  &__header {
    color: var(--sidebar-text);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    text-transform: uppercase;
    width: 100%;

    @extend %caption-2;

    @include margin(right, 2);
  }

  &__item {
    align-items: center;
    border-radius: $radius-8;
    color: var(--sidebar-text);

    @extend %caption-2;

    &:hover {
      background: var(--sidebar-focus);
      cursor: pointer;
    }

    &.active {
      background: var(--sidebar-active);
    }

    &-link {
      display: flex;
      justify-content: space-between;
      padding: $base * 2 $base * 3;
    }

    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 60%;

      @include padding(right, 1);
    }
  }

  &__item + &__item {
    @include margin(top, 1);
  }
}
</style>
