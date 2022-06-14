<template>
  <aside class="dashboard-menu">
    <ul class="dashboard-menu__nav">
      <li
        class="dashboard-menu__nav-item"
        :class="activeClass('Budget')"
        data-test="budget-item"
      >
        <router-link
          class="dashboard-menu__nav-link"
          :to="{ name: 'Budget' }"
          data-test="budget-link"
          @click="emitNavigate"
        >
          <sad-icon class="icon" name="piggy-bank" />{{ t('budget') }}
        </router-link>
      </li>

      <li class="dashboard-menu__nav-item" :class="activeClass('Reports')">
        <router-link class="dashboard-menu__nav-link" to="#">
          <sad-icon class="icon" name="chart-area" />{{ t('reports') }}
        </router-link>
      </li>

      <li
        class="dashboard-menu__nav-item"
        :class="activeClass('AllAccounts')"
        data-test="all-accounts-item"
      >
        <router-link
          class="dashboard-menu__nav-link"
          :to="{ name: 'AllAccounts' }"
          data-test="all-accounts-link"
          @click="emitNavigate"
        >
          <sad-icon class="icon" name="university" />{{ t('allAccounts') }}
        </router-link>
      </li>
    </ul>

    <div
      v-if="budgetAccounts.length || trackingAccounts.length"
      class="dashboard-menu__accounts"
      data-test="accounts-accordion"
    >
      <account-accordion
        v-if="budgetAccounts.length"
        class="dashboard-menu__accounts-list"
        :accounts="budgetAccounts"
        :budget="openBudget"
        :label="t(`budgetAccounts`)"
        data-test="budget-accounts-accordion"
      />
      <account-accordion
        v-if="trackingAccounts.length"
        class="dashboard-menu__accounts-list"
        :accounts="trackingAccounts"
        :budget="openBudget"
        :label="t(`trackingAccounts`)"
        data-test="tracking-accounts-accordion"
      />
    </div>

    <div
      v-else
      class="dashboard-menu__accounts--empty"
      data-test="empty-accounts-text"
    >
      <strong>{{ t('noAccounts') }}</strong>
      <p class="tip">{{ t('noAccountsTip') }}</p>
    </div>

    <sad-button
      class="dashboard-menu__button"
      data-test="add-account-btn"
      size="large"
      @click="toggleModal"
    >
      <sad-icon name="plus" size="small" class="dashboard-menu__button-icon" />
      {{ t('addAccount') }}
    </sad-button>

    <create-account-modal
      :show="modalVisible"
      :budget="openBudget"
      data-test="create-account-modal"
      @close="toggleModal"
    />
  </aside>
</template>

<script lang="ts">
import AccountAccordion from '@/components/accounts/AccountAccordion.vue';
import CreateAccountModal from '@/components/accounts/CreateAccountModal.vue';
import SadButton from '@/components/sad/SadButton.vue';
import SadIcon from '@/components/sad/SadIcon.vue';
import useI18n from '@/use/i18n';
import { budgetAccounts, trackingAccounts } from '@/repositories/accounts';
import { openBudget } from '@/repositories/budgets';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventBus, Events } from '@/events';

export default defineComponent({
  name: 'DashboardMenu',

  components: {
    AccountAccordion,
    CreateAccountModal,
    SadButton,
    SadIcon,
  },

  setup() {
    const { t } = useI18n();
    const modalVisible = ref(false);

    const currentRoute = useRoute();
    const activeClass = (route: string) => {
      return currentRoute.name === route ? 'active' : '';
    };
    const emitNavigate = () => eventBus.emit(Events.CLOSE_DRAWER);

    const toggleModal = () => (modalVisible.value = !modalVisible.value);

    return {
      activeClass,
      budgetAccounts,
      emitNavigate,
      modalVisible,
      openBudget,
      t,
      toggleModal,
      trackingAccounts,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-menu {
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  overflow: auto;
  padding: $base * 3;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &__nav {
    display: flex;
    flex-flow: column;

    &-link {
      display: block;
      font-size: var(--font-body2);
      font-weight: 600;
      padding: $base * 3 $base * 3;
    }

    &-item {
      border-radius: $radius-8;
      cursor: pointer;
      transition: all ease 0.1s;

      &:hover,
      &:focus,
      &:focus-within {
        background: var(--sidebar-focus);
      }

      &.active {
        background: var(--sidebar-active);
      }

      .icon {
        margin-right: $base * 4;
      }
    }

    &-item + &-item {
      margin-top: $base * 1;
    }
  }

  &__accounts {
    margin-top: $base * 4;

    &-list + &-list {
      margin-top: $base * 4;
    }

    &--empty {
      background: var(--sidebar-active);
      border-radius: $radius-8;
      margin-top: $base * 6;
      padding: $base * 4;

      .tip {
        color: var(--sidebar-tip);
        font-size: var(--font-body2);
        margin-top: $base * 4;
      }
    }
  }

  &__button {
    background: var(--sidebar-button-bg);
    border: 0;
    color: var(--sidebar-text);
    margin-top: $base * 5;
    width: 100%;

    &:hover,
    &:focus {
      background: var(--sidebar-focus);
    }

    &-icon {
      margin-right: $base * 2;
    }
  }
}
</style>
