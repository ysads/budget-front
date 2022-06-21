<template>
  <sad-collapse start-open>
    <template #header>
      <span class="account-accordion__header" data-test="title">
        <span class="account-accordion__title">
          {{ label }}
        </span>
        <span class="account-accordion__total">
          {{ format(total, moneySettings) }}
        </span>
      </span>
    </template>
    <ul>
      <li
        v-for="account in accounts"
        :key="account.id"
        class="account-accordion__item"
        :class="activeClass(account)"
        data-test="account-item"
        @click="emitNavigate"
      >
        <router-link
          :to="{ name: 'AccountShow', params: { id: account.id } }"
          class="account-accordion__item-link"
          data-test="account-link"
        >
          <span class="account-accordion__item-name">
            {{ account.name }}
          </span>
          <span class="account-accordion__item-balance">
            {{ format(account.balance, moneySettings) }}
          </span>
        </router-link>
      </li>
    </ul>
  </sad-collapse>
</template>

<script lang="ts">
import SadCollapse from '@/components/sad/SadCollapse.vue';
import { Account, Budget } from '@/types/models';
import { currencySettings, format, totalBalance } from '@/support/money';
import { PropType, computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { eventBus, Events } from '@/events';

export default defineComponent({
  name: 'AccountAccordion',

  props: {
    accounts: {
      type: Array as PropType<Account[]>,
      required: true,
    },
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  components: {
    SadCollapse,
  },

  setup(props) {
    const moneySettings = currencySettings(props.budget);
    const total = computed(() => totalBalance(props.accounts, 'balance'));
    const route = useRoute();

    const openAccountId = computed(() => {
      return route.params.id;
    });

    const activeClass = (account: Account) => {
      return openAccountId.value === account.id ? 'active' : '';
    };

    const emitNavigate = () => eventBus.emit(Events.CLOSE_DASHBOARD_MENU);

    return {
      activeClass,
      emitNavigate,
      openAccountId,
      format,
      moneySettings,
      total,
    };
  },
});
</script>

<style lang="scss" scoped>
.account-accordion {
  &__header {
    color: var(--sidebar-text);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: $base * 3 $base * 2 $base * 3 0;
    width: 100%;

    &__title {
      text-transform: uppercase;
    }
  }

  &__item {
    align-items: center;
    border-radius: $radius-8;
    color: var(--sidebar-text);

    &:hover,
    &:focus-within {
      background: var(--sidebar-focus);
      cursor: pointer;
    }

    &.active {
      background: var(--sidebar-active);
    }

    &-link {
      display: flex;
      justify-content: space-between;
      padding: $base * 2;
    }

    &-name {
      overflow: hidden;
      padding-right: $base * 1;
      text-overflow: ellipsis;
      width: 60%;
    }

    &-balance {
      flex-shrink: 0;
    }
  }

  &__item + &__item {
    margin-top: $base * 1;
  }
}
</style>
