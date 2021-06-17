<template>
  <aside class="dashboard-menu">
    <ul class="dashboard-menu__nav">
      <li class="dashboard-menu__nav-item" :class="activeClass('Budget')">
        <router-link class="dashboard-menu__nav-link" :to="{ name: 'Budget' }">
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
        class="dashboard-menu__accounts-list"
        :accounts="budgetAccounts"
        :budget="openBudget"
        :label="t(`budgetAccounts`)"
        data-test="budget-accounts-accordion"
      />
      <account-accordion
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
      class="dashboard-menu__accounts-btn"
      icon="plus"
      data-test="add-account-btn"
      @click="toggleModal"
    >
      {{ t('addAccount') }}
    </sad-button>

    <create-account-modal
      v-if="modalVisible"
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
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
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
    // const anyAccounts = computed(() => {
    //   return budgetAccounts.value?.length || trackingAccounts.value?.length;
    // });

    const currentRoute = useRoute();
    const activeClass = (route: string) => {
      return currentRoute.name === route ? 'active' : '';
    };

    const toggleModal = () => (modalVisible.value = !modalVisible.value);

    return {
      activeClass,
      // anyAccounts,
      budgetAccounts,
      modalVisible,
      openBudget,
      t,
      toggleModal,
      trackingAccounts,
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard-menu {
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  overflow: auto;
  padding: $base * 3;

  @include transition(all, $cubic-bezier, 0.5s);

  &__nav {
    display: flex;
    flex-flow: column;

    &-link {
      display: block;
      padding: $base * 3 $base * 3;
    }

    &-item {
      border-radius: $radius-8;
      cursor: pointer;
      transition: all ease 0.1s;

      @extend %menu;

      &:hover,
      &:focus {
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

    &-btn {
      background: var(--sidebar-button-bg);
      border: 0;
      color: var(--sidebar-text);
      width: 100%;
      margin-top: $base * 5;

      &:hover {
        background: var(--sidebar-focus);
      }
    }

    &--empty {
      background: var(--sidebar-active);
      border-radius: $radius-8;
      padding: $base * 4;
      margin-top: $base * 6;

      .tip {
        color: var(--sidebar-tip);

        @extend %caption;

        margin-top: $base * 4;
      }
    }
  }
}
</style>
